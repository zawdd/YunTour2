var rejectAppID,updatePrice=function(){var n=$("input[name=tier-price]:radio:checked").val(),t,i;current_price_hidden.val(n),current_price_hidden.trigger("change"),t="Free",n&&n!=0&&(i=$("#userCurrency").val(),t=$("#li"+n).data(i)),current_price_hidden.parent().find("#price-value").html(t)},setDefaultPrice=function(){var n=$("#TierID").val();n!=0&&$("input[value="+n+"]:radio").attr("checked","checked")},current_price_hidden;$(document).ready(function(){$(".price-window-open").click(function(n){if($(this).hasClass("medium-disabled"))return!1;var t=$(this).parent().find("#price-hidden");$("#price-window").lightbox_me({centered:!0,overlayCSS:{background:"black",opacity:.2},zIndex:1036,onLoad:function(){$("input.radio-price[value="+t.val()+"]:radio").attr("checked","checked"),current_price_hidden=t}}),n.preventDefault()}),$(".free-window-open").click(function(n){if($(this).hasClass("medium-disabled"))return!1;$("#free-window").lightbox_me({centered:!0,overlayCSS:{background:"black",opacity:.2},zIndex:1036}),n.preventDefault()}),$(".price-ctrl a.medium-button-action").click(function(){return updatePrice(),$("#price-window").trigger("close"),!1}),$(".price-ctrl a.medium-button").click(function(){return setDefaultPrice(),$("#price-window").trigger("close"),!1}),$(".price-ctrl-free a.medium-button-action").click(function(){return $("#free-window").trigger("close"),!1}),$(".price-ctrl-free a.medium-button").click(function(){return $("#free-window").trigger("close"),!1}),$("#price-currency").change(function(){var n=this.value;$("ul.tiers li").each(function(t,i){var r=$(i).data(n.toString().toLowerCase());$(i).find(".price-field").text(r)})}),$("#price-currency").selectBox("value",$("#userCurrency").val().toUpperCase()),$("#price-currency").trigger("change"),$(".price-popup-button").each(function(){var i=$(this).parent().find("#price-hidden").val(),r="Free",u;i&&i!=0&&(u=$("#userCurrency").val(),r=$("#li"+i).data(u)),$(this).find("#price-value").html(r)}),$(".td-info").qtip({content:{attr:"title"},position:{my:"bottom left",at:"top right",adjust:{x:-15}},show:{event:"click",delay:0},events:{render:function(n,t){var i=t.elements.tip}},style:{tip:{corner:"bottom left",mimic:"bottom center",offset:20,width:11,height:7}}}),$(".pt-drop a.medium-disabled").qtip({content:{attr:"title"},position:{my:"bottom center",at:"top center",adjust:{}},show:{delay:0},events:{render:function(n,t){var i=t.elements.tip}},style:{tip:{width:11,height:7}}}),$(".vis-fav").qtip({content:{attr:"title"},position:{my:"bottom left",at:"top left",adjust:{x:20}},show:{delay:0},events:{render:function(n,t){var i=t.elements.tip}},style:{tip:{corner:"bottom left",mimic:"bottom center",offset:20,width:11,height:7},width:225}}),$(".selectdrop").selectBox(),$("input.radio-styled").customInput(),$("a.learn-toggle").click(function(){return $(this).toggleClass("learn-toggle-on"),$(this).parent().parent().children(".learn-more").slideToggle(),!1});var n=$("input[name$='visibility']:checked").val();n=="is-public"?($("#public-desc").show(),$("#private-desc").hide()):($("#public-desc").hide(),$("#private-desc").show()),$("input[name$='visibility']").click(function(){var n=$(this).val();n=="is-public"?($("#public-desc").slideDown(),$("#private-desc").slideUp(),savePrivacy(!1)):($("#public-desc").slideUp(),$("#private-desc").slideDown(),savePrivacy(!0))})})