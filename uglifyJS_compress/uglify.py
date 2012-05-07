import sublime, sublime_plugin,os

class uglifyJS(sublime_plugin.EventListener):
	def on_post_save(self, view):
		_file_name = _formatPath(view.file_name());
		_path = os.path.dirname(_file_name);

		#compress.js config
		_nodeCommand = _formatPath('node E:/nodejsSite/uglifyJS_compress/compress.js ');

		_compressInfo = 'no compress';
		#path must be composed by slash (/),not by (\)
		#site config
		_siteJsPath = _formatPath('E:/fdx_git/fandongxi/site/js-source');
		if(_path.startswith(_siteJsPath)):
			_compressInfo = 'compress with uglify';
			os.popen(_nodeCommand+_file_name);

		#uglifyInfo.txt at base path of Sublime Text
		file_info = open(sublime.packages_path()+'/../../uglifyInfo.txt', 'w')
		file_info.write('nodeCommand: '+_nodeCommand+_file_name+'\n');
		file_info.write(_compressInfo+'\n');
		file_info.write('currentPath: '+_path+'\n');
		file_info.write('siteJsPath: '+_siteJsPath);
		file_info.close();

def _formatPath (uri):
	return uri.replace('\\','/');
