把原来放在E:\nodejsSite下的可执行文件统一放到E:\nodejsSite\bin下进行管理

修改如下：
*****************************************************************
				sh文件：
*****************************************************************
#!/bin/sh
basedir=`dirname "$0"`

case `uname` in
    *CYGWIN*) basedir=`cygpath -w "$basedir"`;;
esac

if [ -x "$basedir/../node" ]; then
  "$basedir/node"  "$basedir/../node_modules/node-gyp/bin/node-gyp.js" "$@"
  ret=$?
else 
  node  "$basedir/../node_modules/node-gyp/bin/node-gyp.js" "$@"
  ret=$?
fi
exit $ret

*****************************************************************
				cmd文件：
*****************************************************************
:: Created by npm, please don't edit manually.
@IF EXIST "%~dp0\..\node.exe" (
  "%~dp0\node.exe"  "%~dp0\..\node_modules\node-gyp\bin\node-gyp.js" %*
) ELSE (
  node  "%~dp0\..\node_modules\node-gyp\bin\node-gyp.js" %*
)