;(function(){window.Astral={settings:{},vars:{},init:function(){document.addEventListener('DOMContentLoaded',function(){_Core.publish('pre');_Core.publish('dom');_Core.publish('post')});window.onload=function(){_Core.publish('load')}},core:{checkDependencies:function(name,dependencies){dependencies.forEach(function(dependency){try{if(_Astral.loaded.indexOf(dependency)==-1){throw new Error('"'+name+'" is expecting dependency: "'+dependency+'." Make sure "'+dependency+'" is included and loaded before "'+name+'."')}}catch(err){console.error(err.message)}})},load:function(oModule,oFunctions){_Core.register(oModule);oFunctions.forEach(function(sFunction){_Astral[oModule.functionName].sFunction()})},register:function(oModule){if(_Astral.loaded.indexOf(oModule.functionName)==-1){_Core.checkDependencies(oModule.name,oModule.dependencies);_Core.subscribe(oModule.functionName,oModule.subscribers);_Astral.loaded.push(oModule.functionName)}},subscribe:function(functionName,subscribers){Object.keys(subscribers).forEach(function(subscriber){var handlers=subscribers[subscriber];if(handlers.length>0){if(_Subscribers[subscriber]===undefined){_Subscribers[subscriber]=[]}handlers.forEach(function(handler){_Subscribers[subscriber].push(_Astral[functionName][handler])})}})},publish:function(subscriber,data){var _subscribers=_Astral.subscribers;if(!_subscribers[subscriber]){return}_subscribers[subscriber].forEach(function(handler){if(handler){handler(data)}})}},modules:[],utilities:[],subscribers:[],loaded:[]};var _Astral=Astral,_Core=_Astral.core,_Modules=_Astral.modules,_Utilities=_Astral.utilities,_Subscribers=_Astral.subscribers})();Astral.init();