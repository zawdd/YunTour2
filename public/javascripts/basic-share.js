(function(n,t,i,r){function u(t,i){this.element=t,this.options=n.extend(!0,{},h,i),this.options.share=i.share,this._defaults=h,this._name=f,this.init()}var f="sharrre",h={className:"sharrre",share:{googlePlus:!1,facebook:!1,twitter:!1,digg:!1,delicious:!1,stumbleupon:!1,linkedin:!1,pinterest:!1},shareTotal:0,template:"",title:"",url:i.location.href,text:i.title,urlCurl:"sharrre.php",count:{},total:0,shorterTotal:!0,enableHover:!0,enableCounter:!0,enableTracking:!1,hover:function(){},hide:function(){},click:function(){},render:function(){},buttons:{googlePlus:{url:"",urlCount:!1,size:"medium",lang:"en-US",annotation:""},facebook:{url:"",urlCount:!1,action:"like",layout:"button_count",width:"",send:"false",faces:"false",colorscheme:"",font:"",lang:"en_US"},twitter:{url:"",urlCount:!1,count:"horizontal",hashtags:"",via:"",related:"",lang:"en"},digg:{url:"",urlCount:!1,type:"DiggCompact"},delicious:{url:"",urlCount:!1,size:"medium"},stumbleupon:{url:"",urlCount:!1,layout:"1"},linkedin:{url:"",urlCount:!1,counter:""},pinterest:{url:"",media:"",description:"",layout:"horizontal"}}},o={googlePlus:"",facebook:"https://graph.facebook.com/fql?q=SELECT%20url,%20normalized_url,%20share_count,%20like_count,%20comment_count,%20total_count,commentsbox_count,%20comments_fbid,%20click_count%20FROM%20link_stat%20WHERE%20url=%27{url}%27&callback=?",twitter:"http://cdn.api.twitter.com/1/urls/count.json?url={url}&callback=?",digg:"http://services.digg.com/2.0/story.getInfo?links={url}&type=javascript&callback=?",delicious:"http://feeds.delicious.com/v2/json/urlinfo/data?url={url}&callback=?",stumbleupon:"",linkedin:"http://www.linkedin.com/countserv/count/share?format=jsonp&url={url}&callback=?",pinterest:""},c={googlePlus:function(r){var u=r.options.buttons.googlePlus,f;n(r.element).find(".buttons").append('<div class="button googleplus"><div class="g-plusone" data-size="'+u.size+'" data-href="'+(u.url!==""?u.url:r.options.url)+'" data-annotation="'+u.annotation+'"><\/div><\/div>'),t.___gcfg={lang:r.options.buttons.googlePlus.lang},f=0,typeof gapi=="undefined"&&f==0?(f=1,function(){var n=i.createElement("script"),t;n.type="text/javascript",n.async=!0,n.src="//apis.google.com/js/plusone.js",t=i.getElementsByTagName("script")[0],t.parentNode.insertBefore(n,t)}()):gapi.plusone.go()},facebook:function(t){var r=t.options.buttons.facebook,u;n(t.element).find(".buttons").append('<div class="button facebook"><div id="fb-root"><\/div><div class="fb-like" data-href="'+(r.url!==""?r.url:t.options.url)+'" data-send="'+r.send+'" data-layout="'+r.layout+'" data-width="'+r.width+'" data-show-faces="'+r.faces+'" data-action="'+r.action+'" data-colorscheme="'+r.colorscheme+'" data-font="'+r.font+'" data-via="'+r.via+'"><\/div><\/div>'),u=0,typeof FB=="undefined"&&u==0?(u=1,function(n,t,i){var u,f=n.getElementsByTagName(t)[0];n.getElementById(i)||(u=n.createElement(t),u.id=i,u.src="//connect.facebook.net/"+r.lang+"/all.js#xfbml=1",f.parentNode.insertBefore(u,f))}(i,"script","facebook-jssdk")):FB.XFBML.parse()},twitter:function(t){var r=t.options.buttons.twitter,u;n(t.element).find(".buttons").append('<div class="button twitter"><a href="https://twitter.com/share" class="twitter-share-button" data-url="'+(r.url!==""?r.url:t.options.url)+'" data-count="'+r.count+'" data-text="'+t.options.text+'" data-via="'+r.via+'" data-hashtags="'+r.hashtags+'" data-related="'+r.related+'" data-lang="'+r.lang+'">Tweet<\/a><\/div>'),u=0,typeof twttr=="undefined"&&u==0?(u=1,function(){var n=i.createElement("script"),t;n.type="text/javascript",n.async=!0,n.src="//platform.twitter.com/widgets.js",t=i.getElementsByTagName("script")[0],t.parentNode.insertBefore(n,t)}()):n.ajax({url:"//platform.twitter.com/widgets.js",dataType:"script",cache:!0})},digg:function(t){var r=t.options.buttons.digg,u;n(t.element).find(".buttons").append('<div class="button digg"><a class="DiggThisButton '+r.type+'" rel="nofollow external" href="http://digg.com/submit?url='+encodeURIComponent(r.url!==""?r.url:t.options.url)+'"><\/a><\/div>'),u=0,typeof __DBW=="undefined"&&u==0&&(u=1,function(){var n=i.createElement("SCRIPT"),t=i.getElementsByTagName("SCRIPT")[0];n.type="text/javascript",n.async=!0,n.src="//widgets.digg.com/buttons.js",t.parentNode.insertBefore(n,t)}())},delicious:function(t){var i;if(t.options.buttons.delicious.size=="tall")var r="width:50px;",u="height:35px;width:50px;font-size:15px;line-height:35px;",f="height:18px;line-height:18px;margin-top:3px;";else var r="width:93px;",u="float:right;padding:0 3px;height:20px;width:26px;line-height:20px;",f="float:left;height:20px;line-height:20px;";i=t.shorterTotal(t.options.count.delicious),typeof i=="undefined"&&(i=0),n(t.element).find(".buttons").append('<div class="button delicious"><div style="'+r+'font:12px Arial,Helvetica,sans-serif;cursor:pointer;color:#666666;display:inline-block;float:none;height:20px;line-height:normal;margin:0;padding:0;text-indent:0;vertical-align:baseline;"><div style="'+u+'background-color:#fff;margin-bottom:5px;overflow:hidden;text-align:center;border:1px solid #ccc;border-radius:3px;">'+i+'<\/div><div style="'+f+'display:block;padding:0;text-align:center;text-decoration:none;width:50px;background-color:#7EACEE;border:1px solid #40679C;border-radius:3px;color:#fff;"><img src="http://www.delicious.com/static/img/delicious.small.gif" height="10" width="10" alt="Delicious" /> Add<\/div><\/div><\/div>');n(t.element).find(".delicious").on("click",function(){t.openPopup("delicious")})},stumbleupon:function(r){var u=r.options.buttons.stumbleupon,f;n(r.element).find(".buttons").append('<div class="button stumbleupon"><su:badge layout="'+u.layout+'" location="'+(u.url!==""?u.url:r.options.url)+'"><\/su:badge><\/div>'),f=0,typeof STMBLPN=="undefined"&&f==0?(f=1,function(){var n=i.createElement("script"),t;n.type="text/javascript",n.async=!0,n.src="//platform.stumbleupon.com/1/widgets.js",t=i.getElementsByTagName("script")[0],t.parentNode.insertBefore(n,t)}(),s=t.setTimeout(function(){typeof STMBLPN!="undefined"&&(STMBLPN.processWidgets(),clearInterval(s))},500)):STMBLPN.processWidgets()},linkedin:function(r){var u=r.options.buttons.linkedin,f;n(r.element).find(".buttons").append('<div class="button linkedin"><script type="in/share" data-url="'+(u.url!==""?u.url:r.options.url)+'" data-counter="'+u.counter+'"><\/script><\/div>'),f=0,typeof t.IN=="undefined"&&f==0?(f=1,function(){var n=i.createElement("script"),t;n.type="text/javascript",n.async=!0,n.src="//platform.linkedin.com/in.js",t=i.getElementsByTagName("script")[0],t.parentNode.insertBefore(n,t)}()):t.IN.init()},pinterest:function(t){var r=t.options.buttons.pinterest;n(t.element).find(".buttons").append('<div class="button pinterest"><a href="http://pinterest.com/pin/create/button/?url='+(r.url!==""?r.url:t.options.url)+"&media="+r.media+"&description="+r.description+'" class="pin-it-button" count-layout="'+r.layout+'">Pin It<\/a><\/div>'),function(){var n=i.createElement("script"),t;n.type="text/javascript",n.async=!0,n.src="//assets.pinterest.com/js/pinit.js",t=i.getElementsByTagName("script")[0],t.parentNode.insertBefore(n,t)}()}},l={googlePlus:function(){},facebook:function(){fb=t.setInterval(function(){typeof FB!="undefined"&&(FB.Event.subscribe("edge.create",function(n){_gaq.push(["_trackSocial","facebook","like",n])}),FB.Event.subscribe("edge.remove",function(n){_gaq.push(["_trackSocial","facebook","unlike",n])}),FB.Event.subscribe("message.send",function(n){_gaq.push(["_trackSocial","facebook","send",n])}),clearInterval(fb))},1e3)},twitter:function(){tw=t.setInterval(function(){typeof twttr!="undefined"&&(twttr.events.bind("tweet",function(n){n&&_gaq.push(["_trackSocial","twitter","tweet"])}),clearInterval(tw))},1e3)},digg:function(){},delicious:function(){},stumbleupon:function(){},linkedin:function(){},pinterest:function(){}},a={googlePlus:function(n){t.open("https://plus.google.com/share?hl="+n.buttons.googlePlus.lang+"&url="+encodeURIComponent(n.buttons.googlePlus.url!==""?n.buttons.googlePlus.url:n.url),"","toolbar=0, status=0, width=900, height=500")},facebook:function(n){t.open("http://www.facebook.com/sharer/sharer.php?u="+encodeURIComponent(n.buttons.facebook.url!==""?n.buttons.facebook.url:n.url)+"&t="+n.text+"","","toolbar=0, status=0, width=900, height=500")},twitter:function(n){t.open("https://twitter.com/intent/tweet?text="+encodeURIComponent(n.text)+"&url="+encodeURIComponent(n.buttons.twitter.url!==""?n.buttons.twitter.url:n.url)+(n.buttons.twitter.via!==""?"&via="+n.buttons.twitter.via:"")+(n.buttons.twitter.hashtags!==""?"&button_hashtag="+n.buttons.twitter.hashtags:""),"","toolbar=0, status=0, width=650, height=360")},digg:function(n){t.open("http://digg.com/tools/diggthis/submit?url="+encodeURIComponent(n.buttons.digg.url!==""?n.buttons.digg.url:n.url)+"&title="+n.text+"&related=true&style=true","","toolbar=0, status=0, width=650, height=360")},delicious:function(n){t.open("http://www.delicious.com/save?v=5&noui&jump=close&url="+encodeURIComponent(n.buttons.delicious.url!==""?n.buttons.delicious.url:n.url)+"&title="+n.text,"delicious","toolbar=no,width=550,height=550")},stumbleupon:function(n){t.open("http://www.stumbleupon.com/badge/?url="+encodeURIComponent(n.buttons.delicious.url!==""?n.buttons.delicious.url:n.url),"stumbleupon","toolbar=no,width=550,height=550")},linkedin:function(n){t.open("https://www.linkedin.com/cws/share?url="+encodeURIComponent(n.buttons.delicious.url!==""?n.buttons.delicious.url:n.url)+"&token=&isFramed=true","linkedin","toolbar=no,width=550,height=550")},pinterest:function(n){t.open("http://pinterest.com/pin/create/button/?url="+encodeURIComponent(n.buttons.pinterest.url!==""?n.buttons.pinterest.url:n.url)+"&media="+encodeURIComponent(n.buttons.pinterest.media)+"&description="+n.buttons.pinterest.description,"pinterest","toolbar=no,width=700,height=300")}};u.prototype.init=function(){var t=this;this.options.urlCurl!==""&&(o.googlePlus=this.options.urlCurl+"?url={url}&type=googlePlus",o.stumbleupon=this.options.urlCurl+"?url={url}&type=stumbleupon",o.pinterest=this.options.urlCurl+"?url={url}&type=pinterest"),n(this.element).addClass(this.options.className),typeof n(this.element).data("title")!="undefined"&&(this.options.title=n(this.element).attr("data-title")),typeof n(this.element).data("url")!="undefined"&&(this.options.url=n(this.element).data("url")),typeof n(this.element).data("text")!="undefined"&&(this.options.text=n(this.element).data("text")),n.each(this.options.share,function(n,i){i===!0&&t.options.shareTotal++}),t.options.enableCounter===!0?n.each(this.options.share,function(n,i){if(i===!0)try{t.getSocialJson(n)}catch(r){}}):t.options.template!==""?this.options.render(this,this.options):this.loadButtons(),n(this.element).hover(function(){n(this).find(".buttons").length===0&&t.options.enableHover===!0&&t.loadButtons(),t.options.hover(t,t.options)},function(){t.options.hide(t,t.options)}),n(this.element).click(function(){return t.options.click(t,t.options),!1})},u.prototype.loadButtons=function(){var t=this;n(this.element).append('<div class="buttons"><\/div>'),n.each(t.options.share,function(n,i){i==!0&&(c[n](t),t.options.enableTracking===!0&&l[n]())})},u.prototype.getSocialJson=function(t){var i=this,r=0,u=o[t].replace("{url}",encodeURIComponent(this.options.url));this.options.buttons[t].urlCount===!0&&this.options.buttons[t].url!==""&&(u=o[t].replace("{url}",this.options.buttons[t].url)),u!=""&&i.options.urlCurl!==""?n.getJSON(u,function(n){if(typeof n.count!="undefined"){var u=n.count+"";u=u.replace("Â ",""),r+=parseInt(u,10)}else n.data&&n.data.length>0&&typeof n.data[0].total_count!="undefined"?r+=parseInt(n.data[0].total_count,10):typeof n.shares!="undefined"?r+=parseInt(n.shares,10):typeof n[0]!="undefined"?r+=parseInt(n[0].total_posts,10):typeof n[0]!="undefined";i.options.count[t]=r,i.options.total+=r,i.renderer(),i.rendererPerso()}).error(function(){i.options.count[t]=0,i.rendererPerso()}):(i.renderer(),i.options.count[t]=0,i.rendererPerso())},u.prototype.rendererPerso=function(){var n=0;for(e in this.options.count)n++;n===this.options.shareTotal&&this.options.render(this,this.options)},u.prototype.renderer=function(){var t=this.options.total,i=this.options.template;this.options.shorterTotal===!0&&(t=this.shorterTotal(t)),i!==""?(i=i.replace("{total}",t),n(this.element).html(i)):n(this.element).html('<div class="box"><a class="count" href="#">'+t+"<\/a>"+(this.options.title!==""?'<a class="share" href="#">'+this.options.title+"<\/a>":"")+"<\/div>")},u.prototype.shorterTotal=function(n){return n>=1e6?n=(n/1e6).toFixed(2)+"M":n>=1e3&&(n=(n/1e3).toFixed(1)+"k"),n},u.prototype.openPopup=function(n){if(a[n](this.options),this.options.enableTracking===!0){var t={googlePlus:{site:"Google",action:"+1"},facebook:{site:"facebook",action:"like"},twitter:{site:"twitter",action:"tweet"},digg:{site:"digg",action:"add"},delicious:{site:"delicious",action:"add"},stumbleupon:{site:"stumbleupon",action:"add"},linkedin:{site:"linkedin",action:"share"},pinterest:{site:"pinterest",action:"pin"}};_gaq.push(["_trackSocial",t[n].site,t[n].action])}},u.prototype.simulateClick=function(){var t=n(this.element).html();n(this.element).html(t.replace(this.options.total,this.options.total+1))},u.prototype.update=function(n,t){n!==""&&(this.options.url=n),t!==""&&(this.options.text=t)},n.fn[f]=function(t){var i=arguments;return t===r||typeof t=="object"?this.each(function(){n.data(this,"plugin_"+f)||n.data(this,"plugin_"+f,new u(this,t))}):typeof t=="string"&&t[0]!=="_"&&t!=="init"?this.each(function(){var r=n.data(this,"plugin_"+f);r instanceof u&&typeof r[t]=="function"&&r[t].apply(r,Array.prototype.slice.call(i,1))}):void 0}})(jQuery,window,document),$(function(){$(".share-more").click(function(){return!1}),$(".share-more").qtip({content:{text:$(".share-content")},show:{delay:0,effect:function(){$(this).fadeIn(300)}},style:{classes:"ui-tooltip-share",tip:{width:11,height:7}},hide:{delay:300,fixed:!0,effect:function(){$(this).fadeOut(300)}},position:{my:"top center",at:"bottom center",adjust:{y:-5}}});var t=$("#share-box"),i=t.data("shorturl"),n=t.data("url"),r=t.data("twitter-text"),f=t.data("twitter-url"),u=t.data("pinterest-media");console.log(n),$("#fb-share-btn").sharrre({share:{facebook:!0},url:n,template:'<a href="#"><img src="'+baseUrl+'Content/Images/sm-fb.png" alt=""><\/a>',enableTracking:!1,enableHover:!1,click:function(n){n.openPopup("facebook")}}),$("#tw-share-btn").sharrre({share:{twitter:!0},url:i?i:n,text:r,buttons:{twitter:{url:i?i:n,via:"GuidiGO_app"}},template:'<a href="#"><img src="'+baseUrl+'Content/Images/sm-tw.png" alt=""><\/a>',enableTracking:!1,enableHover:!1,click:function(n){n.openPopup("twitter")}}),$("#gp-share-btn").sharrre({share:{facebook:!0},template:'<a href="#"><img src="'+baseUrl+'Content/Images/sm-gp.png" alt=""><\/a>',enableTracking:!1,enableHover:!1,url:n,click:function(n){n.simulateClick(),n.openPopup("googlePlus")}}),$("#pi-share-btn").sharrre({share:{facebook:!0,pinterest:!0},template:'<a href="#"><img src="'+baseUrl+'Content/Images/sm-pi.png" alt=""><\/a>',enableCounter:!1,enableTracking:!1,enableHover:!1,url:n,click:function(n){n.simulateClick(),n.openPopup("pinterest")},buttons:{pinterest:{media:u,description:r,layout:"horizontal"}}})})