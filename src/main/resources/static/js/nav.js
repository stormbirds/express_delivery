url = window.location.href;

document.writeln("<div class=\'layui-header\'>");
document.writeln("    <ul class=\'layui-nav\' lay-filter=\'\'>");
var select_nav = ' layui-this'
var index_nav = ''
var TracesSub_nav = ''
var trackQuery_nav = ''
var setting_nav = ''
if (url.endsWith('index.html')){
    index_nav = ' layui-this'
}else if(url.endsWith('TracesSub.html')){
    TracesSub_nav = ' layui-this'
}else if(url.endsWith('trackQuery.html')){
    trackQuery_nav = ' layui-this'
}else if(url.endsWith('setting.html')){
    setting_nav = ' layui-this'
}else if(url.endsWith('trackingrecord.html')){
    index_nav = ' layui-this'
}
document.writeln("      <li class=\'layui-nav-item "+ index_nav +"  \'><a href=\'trackingrecord.html\'>所有物流订单</a></li>");
document.writeln("      <li class=\'layui-nav-item" + TracesSub_nav +"\'><a href=\'TracesSub.html\'>物流跟踪订阅</a></li>");
document.writeln("      <li class=\'layui-nav-item"+ trackQuery_nav + "\'><a href=\'trackQuery.html\'>即时查询快递单</a></li>");
document.writeln("      <li class=\'layui-nav-item"+ setting_nav + "\'><a href=\'setting.html\'>设置用户资料</a></li>");
document.writeln("    </ul>");
document.writeln("");
document.writeln("  </div>");