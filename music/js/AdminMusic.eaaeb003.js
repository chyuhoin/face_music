(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["AdminMusic"],{"577f":function(t,e,n){},"70ab":function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t._self._c;return e("div",{staticClass:"admin-music"},[e("AddMusic",{attrs:{opened:t.openAddDialog},on:{close:t.closeAdd}}),e("EditMusic",{attrs:{opened:t.openEditDialog},on:{close:t.closeEdit}}),e("el-button",{on:{click:function(e){return t.addMusic()}}},[t._v("添加音乐")]),e("el-button",{on:{click:function(e){return t.editMusic()}}},[t._v("编辑音乐")]),e("SongTable",{attrs:{songs:t.songs,"header-row-class-name":"header-row"}})],1)},s=[],a=(n("7f7f"),n("96cf"),n("1da1")),r=n("ed08"),o=n("365c"),c=n("a110"),u=function(){var t=this,e=t._self._c;return e("div",{staticClass:"add-music"},[e("el-dialog",{attrs:{title:"添加音乐",visible:t.opened},on:{"update:visible":function(e){t.opened=e},close:t.closeDialog}},[e("div",{staticClass:"id-input",staticStyle:{"margin-bottom":"30px"}},[e("span",{staticStyle:{"margin-right":"50px"}},[t._v("音乐名")]),e("el-input",{ref:"input",staticStyle:{width:"50%"},attrs:{placeholder:"输入音乐名进行搜索","prefix-icon":"el-icon-search"},on:{input:t.onInput},nativeOn:{click:function(e){return t.onClickInput.apply(null,arguments)}},model:{value:t.searchKeyword,callback:function(e){t.searchKeyword="string"===typeof e?e.trim():e},expression:"searchKeyword"}}),t.searchPanelShow?e("div",t._l(t.normalizedSuggests,(function(n,i){return e("div",{key:i,staticClass:"suggest-item"},[e("ul",{staticClass:"list"},t._l(n.data,(function(i){return e("li",{key:i.id,staticClass:"item",on:{click:function(t){return n.onClick(i)}}},[e("HighlightText",{attrs:{highlightText:t.searchKeyword,text:i.name+" - "+(i.artists||[]).map((function(t){var e=t.name;return e})).join("/")}})],1)})),0)])})),0):t._e(),e("p",{staticStyle:{"margin-top":"20px"}},[t._v("\n        音乐ID\n        "),e("span",{staticStyle:{"margin-left":"50px"}},[t._v(t._s(t.id))])])],1),e("span",{staticStyle:{"margin-top":"50px"}},[t._v("音乐情感")]),t._l(t.emotionList,(function(n,i){return e("div",{key:i,staticClass:"emotion"},[e("ul",[e("li",{staticStyle:{"margin-top":"10px"}},[e("span",{staticStyle:{display:"inline-block",width:"90px","text-align":"right"}},[t._v(t._s(n.tp))]),e("el-input",{staticStyle:{width:"50px","margin-left":"20px"},attrs:{maxlength:"2",onkeyup:"value=value.replace(/[^\\d]/g,'')"},model:{value:n.val,callback:function(e){t.$set(n,"val",e)},expression:"e.val"}})],1)])])})),e("el-button",{on:{click:function(e){return t.submit()}}},[t._v("添加音乐")])],2)],1)},l=[],d=(n("ac6a"),n("2649")),p={props:{opened:{type:Boolean,default:!1}},data:function(){return{searchKeyword:"",suggest:{},searchPanelShow:!1,id:"",emotionList:[{tp:"anger",val:0},{tp:"disgust",val:0},{tp:"fear",val:0},{tp:"happiness",val:0},{tp:"neutral",val:0},{tp:"sadness",val:0},{tp:"surprise",val:0}]}},methods:{onClickInput:function(){this.searchPanelShow=!0},onBlur:function(){this.searchPanelShow=!1},onInput:Object(r["debounce"])((function(t){var e=this;t.trim()&&Object(o["m"])(t).then((function(t){var n=t.result;e.suggest=n}))}),500),onClickSong:function(t){this.id=t.id,this.searchKeyword=t.name,this.searchPanelShow=!1},submit:function(){var t=Object(a["a"])(regeneratorRuntime.mark((function t(){var e,n,i,s,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(""!==this.id){t.next=3;break}return Object(d["confirm"])("请输入音乐ID！"),t.abrupt("return");case 3:return e=this.emotionList.map((function(t){return parseInt(t.val)+1})),n=e.reduce((function(t,e){return t+e})),i={anger:e[0]/n,disgust:e[1]/n,fear:e[2]/n,happiness:e[3]/n,neutral:e[4]/n,sadness:e[5]/n,surprise:e[6]/n},t.next=8,Object(o["r"])(this.id);case 8:if(s=t.sent,s.songs[0]){t.next=12;break}return Object(d["confirm"])("找不到这样的歌！"),t.abrupt("return");case 12:return t.next=14,r["myRequest"].post("/add/music",{id:this.id,name:s.songs[0].name,emotion:JSON.stringify(i),style:""});case 14:a=t.sent,a.data.name&&(r["notify"].success("音乐".concat(a.data.name,"添加成功！")),this.id="",this.searchKeyword="",this.emotionList.forEach((function(t){return t.val=0})),this.suggest={}),this.$emit("close");case 17:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),closeDialog:function(){this.$emit("close")}},mounted:function(){},computed:{normalizedSuggests:function(){return[{title:"单曲",icon:"music",data:this.suggest.songs,onClick:this.onClickSong.bind(this)}].filter((function(t){return t.data&&t.data.length}))}}},h=p,f=(n("7f47"),n("2877")),m=Object(f["a"])(h,u,l,!1,null,"239dce4d",null),g=m.exports,v=function(){var t=this,e=t._self._c;return e("div",{staticClass:"add-music"},[e("el-dialog",{attrs:{title:"编辑音乐",visible:t.opened},on:{"update:visible":function(e){t.opened=e},close:t.closeDialog}},[e("div",{staticClass:"id-input",staticStyle:{"margin-bottom":"30px"}},[e("span",{staticStyle:{"margin-right":"50px"}},[t._v("音乐名")]),e("el-input",{ref:"input",staticStyle:{width:"50%"},attrs:{placeholder:"输入音乐名进行搜索","prefix-icon":"el-icon-search"},on:{input:t.onInput},nativeOn:{click:function(e){return t.onClickInput.apply(null,arguments)}},model:{value:t.searchKeyword,callback:function(e){t.searchKeyword="string"===typeof e?e.trim():e},expression:"searchKeyword"}}),t.searchPanelShow?e("div",t._l(t.normalizedSuggests,(function(n,i){return e("div",{key:i,staticClass:"suggest-item"},[e("ul",{staticClass:"list"},t._l(n.data,(function(i){return e("li",{key:i.id,staticClass:"item",on:{click:function(t){return n.onClick(i)}}},[e("HighlightText",{attrs:{highlightText:t.searchKeyword,text:i.name}})],1)})),0)])})),0):t._e(),e("p",{staticStyle:{"margin-top":"20px"}},[t._v("\n        音乐ID\n        "),e("span",{staticStyle:{"margin-left":"50px"}},[t._v(t._s(t.id))])])],1),e("span",{staticStyle:{"margin-top":"50px"}},[t._v("音乐情感")]),t._l(t.emotionList,(function(n,i){return e("div",{key:i,staticClass:"emotion"},[e("ul",[e("li",{staticStyle:{"margin-top":"10px"}},[e("span",{staticStyle:{display:"inline-block",width:"90px","text-align":"right"}},[t._v(t._s(n.tp))]),e("el-input",{staticStyle:{width:"50px","margin-left":"20px"},attrs:{maxlength:"2",onkeyup:"value=value.replace(/[^\\d]/g,'')"},model:{value:n.val,callback:function(e){t.$set(n,"val",e)},expression:"e.val"}})],1)])])})),e("div",{staticStyle:{"margin-top":"20px"}},[e("el-button",{on:{click:function(e){return t.submit()}}},[t._v("保存修改")]),e("el-button",{attrs:{type:"danger"},on:{click:function(e){return t.remove()}}},[t._v("删除音乐")])],1)],2)],1)},y=[],b={props:{opened:{type:Boolean,default:!1}},data:function(){return{searchKeyword:"",suggest:{},searchPanelShow:!1,id:"",emotionList:[{tp:"anger",val:0},{tp:"disgust",val:0},{tp:"fear",val:0},{tp:"happiness",val:0},{tp:"neutral",val:0},{tp:"sadness",val:0},{tp:"surprise",val:0}]}},methods:{onClickInput:function(){this.searchPanelShow=!0},onBlur:function(){this.searchPanelShow=!1},onInput:Object(r["debounce"])((function(t){var e=this;t.trim()&&r["myRequest"].get("/musicSearch/"+t).then((function(t){e.suggest=t.data}))}),500),onClickSong:function(t){this.id=t.id,this.searchKeyword=t.name;for(var e=0;e<7;e++)this.emotionList[e].val=Math.round(100*t.emotion[e]);this.searchPanelShow=!1},submit:function(){var t=Object(a["a"])(regeneratorRuntime.mark((function t(){var e,n,i,s,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(""!==this.id){t.next=3;break}return Object(d["confirm"])("请输入音乐ID！"),t.abrupt("return");case 3:return e=this.emotionList.map((function(t){return parseInt(t.val)+1})),n=e.reduce((function(t,e){return t+e})),i={anger:e[0]/n,disgust:e[1]/n,fear:e[2]/n,happiness:e[3]/n,neutral:e[4]/n,sadness:e[5]/n,surprise:e[6]/n},t.next=8,Object(o["r"])(this.id);case 8:if(s=t.sent,s.songs[0]){t.next=12;break}return Object(d["confirm"])("找不到这样的歌！"),t.abrupt("return");case 12:return t.next=14,r["myRequest"].put("/music/"+this.id,{id:this.id,name:s.songs[0].name,emotion:JSON.stringify(i),style:""});case 14:a=t.sent,a.data.name&&(r["notify"].success("音乐".concat(a.data.name,"修改成功！")),this.id="",this.searchKeyword="",this.emotionList.forEach((function(t){return t.val=0})),this.suggest={}),this.$emit("close");case 17:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),closeDialog:function(){this.$emit("close")},remove:function(){var t=this;""!==this.id?Object(d["confirm"])("是否删除歌曲".concat(this.searchKeyword,"？"),(function(){r["myRequest"].delete("/music/"+t.id).then((function(){r["notify"].success("音乐删除成功！"),t.id="",t.searchKeyword="",t.emotionList.forEach((function(t){return t.val=0})),t.suggest={},t.$emit("close")}))})):Object(d["confirm"])("请输入音乐ID！")}},mounted:function(){},computed:{normalizedSuggests:function(){return[{title:"单曲",icon:"music",data:this.suggest,onClick:this.onClickSong.bind(this)}].filter((function(t){return t.data&&t.data.length}))}}},x=b,w=(n("f0f2"),Object(f["a"])(x,v,y,!1,null,"f3aae642",null)),S=w.exports,k={data:function(){return{songs:[],openAddDialog:!1,openEditDialog:!1}},methods:{addMusic:function(){this.openAddDialog=!0},editMusic:function(){this.openEditDialog=!0},closeAdd:function(){this.openAddDialog=!1,this.getSongData()},closeEdit:function(){this.openEditDialog=!1,this.getSongData()},getSongData:function(){var t=Object(a["a"])(regeneratorRuntime.mark((function t(){var e,n,i,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,r["myRequest"].get("/musicIds");case 2:return e=t.sent,n=e.data.ids,t.next=6,Object(o["r"])(n);case 6:i=t.sent,s=i.songs,this.songs=s.map((function(t){var e=t.id,n=t.name,i=t.ar,s=t.dt,a=t.mv,o=t.al,c=o.picUrl,u=o.name;return Object(r["createSong"])({id:e,name:n,artists:i,duration:s,albumName:u,img:c,mvId:a})}));case 9:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}()},mounted:function(){this.getSongData()},components:{SongTable:c["a"],AddMusic:g,EditMusic:S}},_=k,C=(n("c7b4"),Object(f["a"])(_,i,s,!1,null,"7b378a8c",null));e["default"]=C.exports},"7f47":function(t,e,n){"use strict";n("c0dd")},"9a90":function(t,e,n){},c0dd:function(t,e,n){},c7b4:function(t,e,n){"use strict";n("9a90")},f0f2:function(t,e,n){"use strict";n("577f")}}]);