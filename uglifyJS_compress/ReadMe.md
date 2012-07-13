# 借助于Sublime Text和Uglify实现程序自动压缩脚本

## 使用步骤如下：
* 一、Uglify压缩脚本安装
	1. 安装nodeJS并配置环境变量
	2. 新建目录sampleFolder
	3. 把compress.js放入sampleFolder
	4. 在sampleFolder中新建目录node_modules
	5. 把node_modules里的uglify-js和colors复制到node_modules下

* 二、配置Sublime Text插件
	1. 把 ./uglify.py放在Sublime Text的安装目录/Data/Packages/Default/下
	2. 修改./uglify.py,配置相应参数
	3. 重启Sublime Text，在用户保存文件时就可以自动压缩脚本

## compress.js用法

##### node compress.js [sourceFilePath] [miniFilePath] 
* node compress.js　(压缩默认目录所有文件)
* node compress.js /source-path	(压缩指定目录到把路径js-source替换成js的目录)
* node compress.js /source-path /target-path (压缩指定目录)
* node compress.js /data/js-source/test.js　(压缩指定文件到把路径js-source替换成js的目录)
* node compress.js /data/js-source/test.js /data/js/test.js (压缩指定文件)