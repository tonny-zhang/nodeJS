// helloworld.cc

#include <node.h>    //首先引入node头文件

using namespace v8;  //使用V8和，node命名空间
using namespace node;

/**
 * 这个就是我们要扩展到NodeJs的c函数了，函数的原型一定得是
 * Handle<Value> function_name(const Arguments& args);
 * 里面就可以使用C++写各种底层操作了
 */
Handle<Value> sayHelloWorld(const Arguments& args){
    HandleScope scope;
    printf("Hello World!\n"); //打印一个“Hello World!”
    return scope.Close(Undefined()); //返回undefined
}

/**
 * 初始化函数，将需要导出的方法绑定到js对象上
 * 类似 export.XXX = function(){};
 */
void init(Handle<Object> target) {
    NODE_SET_METHOD(target, "say", sayHelloWorld);
}

//!!!!!这里的module_name必须和binding.gyp文件里定义的target_name（即最后编译完后的二进制文件名）保持一致
NODE_MODULE(hw, init); //Node require的时候会执行的函数，整个模块的入口