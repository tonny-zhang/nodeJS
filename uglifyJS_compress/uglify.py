import sublime, sublime_plugin,os,json

class uglifyJS(sublime_plugin.EventListener):
	def on_post_save(self, view):
		_file_name = _formatPath(view.file_name());
		_path = os.path.dirname(_file_name) + '/';

		#compress.js config
		_nodeCommand = _formatPath('node E:/nodejsSite/uglifyJS_compress/compress.js ');

		_compressInfo = 'no compress';
		#path must be composed by slash (/),not by (\)
		#site config,end width /
		#ex:['site1/',['siteOld','siteNew']]
		_siteJsPath = [_formatPath('E:/fdx_git/fandongxi/site/js-source/'),
						[_formatPath('D:/GC/test/'),_formatPath('D:/GC/test-min/')]
					  ];
		for _jsPathConfig in _siteJsPath:
			_checkPath = _jsPathConfig[0] if type(_jsPathConfig) == type([]) else _jsPathConfig;

			if(_path.startswith(_checkPath)):
				_compressInfo = 'compress with uglify';
				_nodeCommand += _file_name+' ';
				_nodeCommand += _file_name.replace(_jsPathConfig[0],_jsPathConfig[1]) if (type(_jsPathConfig) == type([]) and len(_jsPathConfig) > 1) else '';
				os.popen(_nodeCommand);
				break;

		#uglifyInfo.txt at base path of Sublime Text
		file_info = open(sublime.packages_path()+'/../../uglifyInfo.txt', 'w')
		file_info.write('nodeCommand: '+_nodeCommand+'\n');
		file_info.write(_compressInfo+'\n');
		file_info.write('currentPath: '+_path+'\n');
		file_info.write('checkPath: '+_checkPath+'\n');
		file_info.write('siteJsPath: '+json.dumps(_siteJsPath)+'\n');
		file_info.close();

def _formatPath (uri):
	return uri.replace('\\','/');
