# 借助于Sublime Text和Uglify实现程序自动压缩脚本

## 使用步骤如下：
* 一、Uglify压缩脚本安装
	1. 安装nodeJS并配置环境变量
	2. 新建目录sampleFolder
	3. 把compress.js放入sampleFolder
	4. 在sampleFolder中新建目录node_modules
	5. 把node_modules里的uglify-js、colors和node-css-compressor复制到node_modules下

* 二、配置Sublime Text插件
	1. 把 ./uglify.py放在Sublime Text的安装目录/Data/Packages/Default/下
	2. 修改./uglify.py,配置相应参数
	3. 重启Sublime Text，在用户保存文件时就可以自动压缩脚本

## compress.js用法

#### node compress.js [sourceFilePath] [miniFilePath] 
* node compress.js /source-path	(压缩指定目录到默认目录)
* node compress.js /source-path /target-path (压缩指定目录)
* node compress.js /data/js-source/test.js　(压缩指定目录到默认目录)
* node compress.js /data/js-source/test.js /data/js/test.js (压缩指定文件)

####　miniFilePath为空时的生成规则
	1.首先会把目录中的-source替换掉(只替换目录，不替换文件名)，
		如：/a/js-source -> /a/js,a/js-source/b.js -> a/js/b.js
	2.如果生成的目标目录和原目录相同
		* 如果是目录直接在源目录后加 "-min",
			如：/a/js -> /a/js-min,/a/css -> a/css-min
		* 如果是文件把文件名后加 "-min",
			如：/a/js/a.js -> /a/js/a-min.js,/a/css/a.css -> /a/css/a-min.css

##node版本升级造成脚本运行异常
	　　由于node升级造成脚本运行异常，node 0.7+以上把path.exists和path.existsSync迁移到了fs模块里，
	所以会报出警告，这时sublime得到的输出结果有异常，导致整个脚本不会运行结果不对，请更新compress.js。
