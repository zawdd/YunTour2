﻿
/*
 * GET home page.
 */
var User = require('../models/user.js');
var Line = require('../models/line.js');
var ObjectId = require('mongodb').ObjectID;
var fs = require('fs');
var util = require('util');

exports.index = function(req, res){
  
  res.render('index', { 
    title : 'YunTour',
    user : req.session.user
  });
};

exports.reg = function(req, res){
  res.render('signup', {       
    title: '用户注册',
//    user: req.session.user,    
//    success: req.flash('success').toString(),      
//    error: req.flash('error').toString() 
  });
};

//用户注册页面post处理
exports.doReg = function(req, res){
  console.log(req.body.useremail +"/n" + req.body['password'] + "/t" + req.body['password-repeat']);
  if (req.body['password-repeat'] !== req.body['password']){
    req.flash('error', '两次输入的口令不一样');
    console.log("两次口令不一样");
    return res.redirect('/signup');
  }

  var newUser = new User({
    userEmail : req.body.useremail,
    userName : "",
    password : req.body.password,
    userNation : "中国",
    usserImage : "",
    accountType : "免费",
    tourCreate : [],
    takenSpace : 0,
    userLanguage : "中文",
    userShort : "",     
    baseDir : "",
    authorType : "职业导游",
    signUpDate : new Date()
  });

  User.get(newUser.userEmail, function(err, user){
    //检查用户名是否存在    
    if (user) {
      err = 'Useremail already exists.';
      
    }
    if (err) {
      req.flash('error', err);
      console.log("用户已经存在");
      return res.redirect('/signup');
    }
    //如果不存在则新增用户
    newUser.create(function(err) {
      if (err) {
	req.flash('error', err);
	return res.redirect('/singup');
	console.log("插入失败");
      }
      
      req.session.user = newUser;
      //创建完成用户后根据用户id更新用户在服务器上的存储路径
      User.updateBaseDir(req.session.user.userEmail, function(err, user){
        if (err) {
	  req.flash('error', err);
    	  return res.redirect('/signup');
        }
	if (user) {
	  //建立以user.baseDir为目录的文件夹
	  console.log("user.baseDIr:"+user.baseDir);
	}
      });

      req.flash('success', '注册成功');
      console.log("注册成功")
      res.redirect('/');      
    });
  });
};

//用户资料编辑页面
exports.edit = function(req, res){
  res.render('useredit', {       
    title: '用户资料修改',
    user: req.session.user,
  });
};

exports.doEdit = function(req, res){
  if (req.body['password-repeat'] !== req.body['password']){
    req.flash('error', '两次输入的口令不一样');
    console.log("两次口令不一样");
    return res.redirect('/useredit');
  }

  User.findAndModifyByName(req.session.user.userEmail,
                           req.body.username,
                           req.body.password,
			   req.body.usershort,
			   req.body.userimage,//应使用真实的上传目录
                           function(err, user){
    if(err){       
      req.flash('error', err);
      return res.redirect('/useredit');
      console.log("更改用户信息失败");      
    }
    req.flash('success', '更改用户信息成功');
    console.log("更改用户信息成功")
    res.redirect('/usercenter'); 

  });

};

//显示用户的所有信息
exports.usercenter = function(req, res){
  User.get(req.session.user.userEmail, function(err, user) { //由于可能用户编辑，所以需要即时刷新
    req.session.user = user;
      res.render('usercenter', {
      title: "用户中心",
      user : req.session.user,
    });
  });
};

//用户登录
exports.login = function(req, res){
  res.render('signin', {
    title: '用户登入',
//    user: req.session.user,
    success: req.flash('success').toString(),
    error: req.flash('error').toString()
  });
};

exports.doLogin = function(req, res){
      User.get(req.body.useremail, function(err, user) {
	if (!user) {
	  req.flash('error', '用户不存在');
	  return res.redirect('/signin');
	}
	if (user.password !== req.body.password) {
	  req.flash('error', '用户口令错误');
	  return res.redirect('/signin');
	}
	req.session.user = user;
 	req.flash('success', '登入成功');
	console.log("用户"+user.userEmail+"成功登录");
	res.redirect('/');
      });
};

//登出
exports.logout = function(req, res) {
  req.session.user = null;
  req.session.lineId = null;
  req.flash('success', '登出成功');
  console.log("用户成功登出");
  res.redirect('/');
};

//检查用户在访问页面时是否已经登陆
exports.checkLogin = function(req, res, next) {
  if (!req.session.user) {
    req.flash('error', '未登入');
    return res.redirect('/signin');
  }    
  next();
};

exports.checkNotLogin = function(req, res, next) {
  if (req.session.user) {
    req.flash('error', '已登录');
    return res.redirect('/');
  }
  next();
};

//创建线路
exports.createLine = function(req, res) {
  res.render('createline', {
    title: "创建一条新的线路",
    user : req.session.user,
  });

};


exports.doCreateLine = function(req, res) {
  //省略了输入合法性的判断

  var newLine = new Line({
    lineName : req.body.linename,
    coverThumbnail : req.body.coverthumbnail,
    lineSummary : req.body.linesummary,
    stops : [],
    baseDir : "",
    mapType : "googlemap",
    mapAddress : "",
    locate : [],
    language : req.body.language,
    lineLength : 0,
    duration : req.body.duration,
    topics : req.body.topics,
    price : req.body.price,
    authorEmail : req.session.user.userEmail,
    author : req.session.user.userName, 
    authorBio : req.session.user.userShort,
    authorImage : req.session.user.userImage,
    authorType :  req.session.user.authorType,
    keyWords : req.body.keywords,
    traffics : req.body.traffics,
    cautions : "",
    lineLinks : "",
    lineVedios : "",
    totalScore : 0,
    totalPeople : 0,
    createDate : new Date()
  }); 

  newLine.create(function(err){
    if (err) {
      req.flash('error', err);
      return res.redirect('/createline');
      console.log("插入失败");
    } else {
      req.flash('success', '创建成功');
      res.redirect("/");
    }

  });
};

//浏览一条线路的详细信息
exports.browseDetail = function browseDetail(req, res){
  console.log(req.params.lineid);
  Line.get(req.params.lineid, function(err, line){
    User.get(line.author, function(err, user){
      res.render('browsedetail', {
        title : "浏览详细线路信息",
        line : line,
        user : user,
	lineid : req.params.lineid,      
      });
    });
    
  });

};

//显示路线的列表
exports.browseList = function browseList(req, res){
  var key = '人文';
//  var key = [10, 20];
//  Line.findByLocation(key, function(err, lines){
  Line.findByTopics(key,0,25, function(err, lines){
    if (err) {
      var lines = [];
    }
    res.render('browselist',{
      title : "路线列表",
      lines : lines,
      //users : users,
    });   
  });
};

//根据路线ID，增加其中的站点
//可以根据用户名搜索出用户创建的路线，进而找到路线ID
//这里需要防止A用户修改B用户路线的信息
exports.createStops = function createStops(req, res){

  Line.get(req.params.lineid, function(err, line){
    User.get(line.author, function(err, user){
      res.render('createstops', {
        title : "创建站点",
        line : line,
        user : user,
      });
    });    
  });

};

exports.doCreateStops = function doCreateStops(req, res){
  var stop = {
    num : req.body.num, //通过数组中的位置来给出顺序
    //lineId : new ObjectId(req.params.lineid),
    stopName : req.body.stopname,
    stopDes : req.body.stopdes,
    locate : [],
    stopThumbnail : req.body.stopthumbnail,
    stopImages : [req.body.stopimages1,
                  req.body.stopimages2, 
		  req.body.stopimages3],
    stopAudio : req.body.stopaudio,
    imageOrder : req.body.imageorder,
    createDate : new Date(),
  };

  Line.insertStop(req.params.lineid, stop, function(err, line){
    if (err) {
      req.flash('error', err);
      return res.redirect('/createstop');
      console.log("插入失败");
    } else {
      req.flash('success', '插入成功');
      res.redirect("/browesdetail/"+req.params.lineid);
    }
  }); 
};

//在地图上标注站点
exports.signMap = function signMap(req, res){
//显示路线和其中的每个站点
  Line.get(req.params.lineid, function(err, line){
    res.render('signmap', {
      title : "标注每个站点的位置",
      line : line,
      lineid : req.params.lineid,      
    });
    
  });

};

exports.doSignMap = function doSignMap(req, res){
//接受googlemap标注的信息，转换成坐标
  //var locations = [{[11, 20]},{[11, 21]},{[12, 21]}];
  var locations = new Array();
  locations[0] = [11, 20];
  locations[1] = [11, 21];
  locations[2] = [12, 21];
  console.log(locations.length);

  Line.get(req.params.lineid, function(err, line){
    line.locate = locations[0];
    line.lineLength = 10;//根据具体坐标计算
    for(var i = 0; i<locations.length; i++){
      line.stops[i].locate = locations[i];
    }   
    Line.update(req.params.lineid, line, function(err, doc){
      if (err) {
        req.flash('error', err);
        return res.redirect('/signmap/'+req.params.lineid);
        console.log("标注失败");
      } else {
        req.flash('success', '标注成功');
        res.redirect("/browesdetail/"+req.params.lineid);
      }

    });
  });
};

//Android端
//根据topic显示路线
exports.browseByTopic = function browseByTopic(req, res){
  var topic = req.query.topic;
  var beg = req.query.beg;
  var end = req.query.end;
  Line.findByTopics(topic, beg, end, function(err, lines){
    if (err) {
      var lines = [];
    }
    res.end(JSON.stringify(lines), 'utf8'); 
  });
};
//根据mapAddress显示路线
exports.browseByAddress = function browseByAddress(req, res){
  var mapaddress = req.query.address;
  var beg = req.query.beg;
  var end = req.query.end;
  Line.findByAddress(mapaddress, beg, end, function(err, lines){
    if (err) {
      var lines = [];
    }
    res.end(JSON.stringify(lines), 'utf8'); 
  });
};
//根据mapAddress和topic显示路线
exports.browseByAddressTopic = function browseByAddressTopic(req, res){
  var mapaddress = req.query.address;
  var topic = req.query.topic;
  var beg = req.query.beg;
  var end = req.query.end;
  Line.findByAddressTopic(mapaddress, topic, beg, end, function(err, lines){
    if (err) {
      var lines = [];
    }
    res.end(JSON.stringify(lines), 'utf8'); 
  });
};

//根据位置坐标显示路线
exports.browseByLocation = function browseByLocation(req, res){
  var locations = [req.query.x, req.query.y];
  var beg = req.query.beg;
  var end = req.query.end;
  Line.findByLocation(locations, beg, end, function(err, lines){
    if (err) {
      var lines = [];
    }
    res.end(JSON.stringify(lines), 'utf8'); 
  });

};

//浏览一条线路的详细信息
exports.browseByID = function browseByID(req, res){
  Line.get(req.query.lineid, function(err, line){
    if (err) {
      var line = null;
    }
    res.end(JSON.stringify(line), 'utf8');
  });    
};
//根据用户email显示路线
exports.browseByEmail = function browseByEmail(req, res){
  var authoremail = req.query.author;
  Line.findByEmail(authoremail, function(err, lines){
    if (err) {
      var lines = [];
    }
    res.end(JSON.stringify(lines), 'utf8'); 
  });
};

//根据时间顺序显示路线
exports.browseAllByTime = function browseAllByTime(req, res){
  var beg = req.query.beg;
  var end = req.query.end;
  Line.findAllByTime(beg, end, function(err, lines){
    if (err) {
      var lines = [];
    }
    res.end(JSON.stringify(lines), 'utf8'); 
  });
};

//apk版本更新
exports.apkupdate = function apkupdate(req, res){
  var version = {
    down_url : "http://103.31.20.134:3000/YouTour.apk",
    version_code : 2,
    content : "Version 1.0 <p>更新信息:</p><li>添加退出处理</li><li>添加版本更新</li><li>同步后台代码</li><li>修复bug</li>"
  };
    res.end(JSON.stringify(version), 'utf8'); 
};
//web端路由函数

var httphead = "http://103.31.20.134:3000";
exports.step1 = function(req, res) {

  res.render('step1', {
    title: "创建一条新的线路",
    user : req.session.user,
  });

};

exports.step1Save = function(req, res) {

  console.log("userimage  "+req.session.user.userImage);
  var alltopics = ["历史","艺术","时尚","体育","家庭","生活方式","自然"];
  var topicsArr = req.body.topics.split(',');
  var topics = new Array();
  for(var i=0;i<topicsArr.length;i++){
      topics[i] = alltopics[parseInt(topicsArr[i])];
  }

  User.get(req.session.user.userEmail, function(err, user){

  var newLine = new Line({
    lineName : req.body.lineName,
    coverThumbnail : httphead+req.body.coverThumbnail,
    lineSummary : req.body.lineSummary,
    stops : [],
    baseDir : "",
    mapType : "Google",
    mapAddress : req.body.mapAddress,
    locate : [],
    language : "中文",
    lineLength : 8.8,
    duration : 200,
    topics : topics,
    price : 0,
    authorEmail : user.userEmail,//req.session.user.userEmail,
    author : user.userName,//req.session.user.userName, 
    authorImage : user.userImage,//req.session.user.userImage,
    authorBio : user.userShort,//req.session.user.userShort,
    authorType :  user.authorType,//req.session.user.authorType,
    keyWords : req.body.keyWords.split(','),
    traffics : "",
    cautions : "",
    lineLinks : "",
    lineVedios : "",
    totalScore : 10,
    totalPeople : 1,
    createDate : new Date()
  }); 

  newLine.create(function(err, line){
    if (err) {
      req.flash('error', err);
      return res.redirect('/step1');
      console.log("插入失败");
    } else {
      //req.flash('success', '创建成功');
      console.log("create"+line._id);
      req.session.lineId = line._id;
      req.flash('success', '成功');
      res.redirect('/step2');
    }
  });

  });//userget

};

exports.step2 = function(req, res){
  if(req.session.lineId){
    Line.get(req.session.lineId, function(err, line){
      User.get(line.authorEmail, function(err, user){
        res.render('step2', {
          title: '创建站点',
          user: req.session.user.userEmail,
          line : line,
	  lineid : req.session.lineId, 
	  songmp3: '/images/audio.mp3',
          starttime: '0',
          songname: 'audio'     
        });
      });    
    });
  }else {
    res.redirect('/step1');
  }

};
/*
exports.step2Save = function(req, res){
  Line.get(req.session.lineId, function(err, line){
    line.stops[req.body.stopnum].stopName = req.body.stopname;

    Line.update(req.session.lineId, line, function(err, doc){
      if (err) {
        req.flash('error', err);
        //return res.redirect('/signmap/'+req.params.lineid);
      } else {
        req.flash('success', '成功');
        //res.redirect("/browesdetail/"+req.params.lineidC:/Users/SEA_SM~1/AppData/Local/Temp/411c2e0ff8c1dd8950794bf07c32546d);
      }
    });
  });
};
*/
exports.step2Insert = function(req, res){
  console.log("11"+req.body.stopthumbnail);
  console.log("22"+req.body.stopimages);
  console.log("33"+req.body.stopname);
 // var num = req.body.stopnum;
  var num = 0;
  var images = new Array();
  images = req.body.stopimages.split(',');
  images.splice(images.length-1, 1);//删除最后一个空的图片

  for(var i = 0; i<images.length; i++){
    
    images[i] = httphead + images[i];
  }
  var stop = {
    num : num, //通过数组中的位置来给出顺序
    stopName : req.body.stopname,
    stopDes : req.body.stopdes,
    locate : [],
    stopThumbnail : httphead + req.body.stopthumbnail,
    stopImages : images,
    stopAudio : httphead + req.body.stopaudio,
    imageOrder : '0',
    createDate : new Date(),
  };
  Line.insertStop(req.session.lineId, stop, function(err, line){
    if (err) {
      req.flash('error', err);  
    } else {
      req.flash('success', '插入成功');
    }
      res.redirect('/step2');
  });
};

exports.step3 = function(req, res){
  //根据路线ID查询得到stop的数组
  if(req.session.lineId){
  Line.get(req.session.lineId, function(err, line){
    var stopIdArr = new Array();
    var stopNameArr = new Array();
    var i = 0;
    var stopArr = line.stops;
    for(i = 0; i<stopArr.length; i++){
	stopIdArr[i] = stopArr[i].num;
	stopNameArr[i] = stopArr[i].stopName;
    }
    res.render('step3', { 
      title: '站点地图',
      user: req.session.user.userEmail,
      lineId: req.session.lineId,
      line : line,	    
      stopIds: stopIdArr,
      stopNames: stopNameArr,
      apikey: 'AIzaSyATIm9ONp2ng5G5gNf3t-MiuorcUtCIl1I',
      latOrigin: line.locate[0],
      lngOrigin: line.locate[1],
      userName: req.session.user.userName	    
    });    
  });
  }else{
    res.redirect('/step1');
  }    
};

exports.mapInfoHandler = function(req, res){
  var locations = new Array();
  console.log(req.body["1"]);
  var i = 1;
  while(1){
    if(req.body[""+i]){	
      var temp = req.body[""+i].split(",");	    
      locations[i-1] = [parseFloat(temp[0]), parseFloat(temp[1])];

      console.log(locations[i-1]);
      i++;
    }else 
      break;

  }
  
  console.log(locations.length);

  Line.get(req.session.lineId, function(err, line){
    line.locate = locations[0];
    line.lineLength = 8.8;//根据具体坐标计算
    for(var i = 0; i<locations.length; i++){
      line.stops[i].locate = locations[i];
      line.stops[i].num = i+1;
    }   
    Line.update(req.session.lineId, line, function(err, doc){
      if (err) {
        req.flash('error', err);
        
        console.log("标注失败");
	return res.redirect('/step3');
      } else {
        req.flash('success', '标注成功');
	req.session.lineId = null;
        res.redirect('/create');
      }

    });
  });
  
};

exports.create = function(req, res) {

  var authoremail = req.session.user.userEmail;
  Line.findByEmail(authoremail, function(err, lines){
    if (err) {
      var lines = [];
    }
    res.render('create', { 
      title : '创建路线',
      user : req.session.user.userEmail,
      page : '1',      
      lines : lines
      });
  });


};

exports.detail = function(req, res) {
  Line.get(req.query.lineid, function(err, line){
    //User.get(line.authorEmail, function(err, user){
      res.render('detail', {
        title : "浏览详细线路信息",
        line : line,
		lineSummary : line.lineSummary.replace(/\r\n/gi, "<br/>"),
        user : req.session.user,
		lineId : req.query.lineid      
      });
    //});
    
  });
};

exports.browse = function(req, res) {
  var page = 1;
  if (req.query.page)
    page = req.query.page;	  
  var beg = (page-1)*10;
  var end = page*10;
  Line.findAllByTime(beg, end, function(err, lines){
    if (err) {
      var lines = [];
    }
    if( Object.keys(lines).length != 0){
      res.render('browse', { 
        title : '观看路线',
        user : req.session.user,
        lines : lines,
	page : req.query.page      
        //lineAuthorNations: 'lineAuthorNationArr'
      });
    }else{
      res.redirect("/browse?page="+(req.query.page-1));
    }	    
  });

};

exports.home = function(req, res) {
  res.render('home', {
    title : "个人设置",
    user : req.session.user,  
    uploadFileName : ""//'/images/b1.jpg'	  

  });
      
};

exports.doHome = function(req, res) {
/* if (req.body['password-repeat'] !== req.body['password']){
    req.flash('error', '两次输入的口令不一样');
    console.log("两次口令不一样");
    return res.redirect('/home');
  }
*/
  var password = req.session.user.password;
  var userimage = "";
  if (req.body.userimage) {
    userimage = httphead + req.body.userimage;
  }
  console.log("userimage"+userimage);	  
  User.findAndModifyByName(req.session.user.userEmail,
                           req.body.username,
                           password,
			   req.body.usershort,
			   userimage,//应使用真实的上传目录
                           function(err, user){
    if(err){       
      req.flash('error', err);
      return res.redirect('/home');
      console.log("更改用户信息失败");      
    }

    req.flash('success', '更改用户信息成功');
    console.log("更改用户信息成功")
    res.redirect('/'); 

  });

};

exports.remove = function(req, res) {
  console.log("delete"+req.session.lineId);

  if (req.session.lineId){
      var lineid = req.session.lineId; 
  }else if (req.query.lineid){
      var lineid = req.query.lineid; 
  }

  Line.remove(lineid, function(err, line){
    req.session.lineId = null;
    res.redirect("/create");
  });
};

exports.uploadifyhandler = function(req, res, next) {
  console.log(req.files.Filedata.path);//上传到服务器上的文件名字及路径，但没有文件后缀
  console.log(req.files.Filedata.name);//文件在用户本地上的文件名，包含后缀名 
  
  //var succ=false;
  var fileName = req.files.Filedata.path + '.' + req.files.Filedata.name.substr(req.files.Filedata.name.indexOf('.')+1).toLowerCase();
  console.log(fileName);//上传到服务器上的文件名字及路径，有文件后缀
  var readStream = fs.createReadStream(req.files.Filedata.path);
  var pre = fs.realpathSync('./public');
  var writeStream = fs.createWriteStream(pre + fileName);
  util.pump(readStream, writeStream, function() {

    fs.unlinkSync(req.files.Filedata.path);

  });
  /* 
  fs.rename(req.files.Filedata.path, './public' + fileName, function(){
  	//succ = true;
  });*/
   /*moveFile(fileName, '/public/'+fileName, function() {
  });*/
  //fs.createReadStream(fileName).pipe(fs.createWriteStream(fileName));
  if(1){
      res.send(JSON.stringify({success: true, uploadFileName: fileName}), {'Content-Type': 'text/plain'}, 200);
      //res.redirect("/home")
  }
  else
      res.send(JSON.stringify({success: false, error: "err"}), {'Content-Type': 'text/plain'}, 404);
};

//Andorid test
exports.androidTest = function androidTest(req, res){
  /*console.log(req.body);
  lineid = '515e4f2c477d6e8405000002';
  res.contentType('json');
  //res.send(JSON.stringify({statu : "success" }));
  //res.end(JSON.stringify({statu : "success" }));
  
  Line.get(lineid, function(err, line){
    console.log(line.lineName);
    res.contentType('json');
    //res.send(JSON.stringify(line));
    //res.json(line);
    //res.send(JSON.stringify({status : "error" }));
    //res.send("blablablablabla");
    res.end(JSON.stringify(line), 'utf8');
  });*/

    var key = '人文';
//  var key = [10, 20];
//  Line.findByLocation(key, function(err, lines){
  Line.findByTopics(key, function(err, lines){
    if (err) {
      var lines = [];
    }
    res.end(JSON.stringify(lines), 'utf8');
  })
 
};

exports.test = function(req, res){
    var alltopics = ["历史","艺术","时尚","体育","家庭","生活方式","自然"];
    var topicsArr = req.query.topics.split(',');
    var topics = new Array();
    for(var i=0;i<topicsArr.length;i++){
      topics[i]=alltopics[parseInt(topicsArr[i])];
    }  
    console.log(topics);
};
