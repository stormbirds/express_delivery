url = window.location.href;

document.writeln("<div class=\'layui-header\'>");
document.writeln("    <ul class=\'layui-nav\' lay-filter=\'\'>");
var select_nav = ' layui-this'
var index_nav = ''
var TracesSub_nav = ''
var trackQuery_nav = ''
var setting_nav = ''
var trackingrecord_nav = ''
if (url.endsWith('index.html') || url.endsWith('expressTracking.html')){
    index_nav = ' layui-this'
}else if(url.endsWith('trackingRecordDetail.html')){
    TracesSub_nav = ' layui-this'
}else if(url.endsWith('trackQuery.html')){
    trackQuery_nav = ' layui-this'
}else if(url.endsWith('setting.html')){
    setting_nav = ' layui-this'
}else if(url.endsWith('trackingrecord.html')){
    trackingrecord_nav = ' layui-this'
}
document.writeln("      <li class=\'layui-nav-item "+ index_nav +"  \'><a href=\'expressTracking.html\'>所有导入订单</a></li>");
document.writeln("      <li class=\'layui-nav-item "+ trackingrecord_nav +"  \'><a href=\'trackingrecord.html\'>物流订阅</a></li>");
document.writeln("      <li class=\'layui-nav-item" + TracesSub_nav +"\'><a href=\'trackingRecordDetail.html\'>物流跟踪</a></li>");
document.writeln("      <li class=\'layui-nav-item"+ trackQuery_nav + "\'><a href=\'trackQuery.html\'>即时查询快递单</a></li>");
document.writeln("      <li class=\'layui-nav-item"+ setting_nav + "\'><a href=\'setting.html\'>设置用户资料</a></li>");
document.writeln("    </ul>");
document.writeln("");
document.writeln("  </div>");