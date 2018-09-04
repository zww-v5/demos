# 社区项目整体框架说明

# 项目文件夹说明
## base
base 文件夹存放的是整个社区通用的组件库，包括：reset、导航、底部、弹窗、气泡、图标、表单元素等
每个组件按文件夹存放

这里组件的样式都引入到外层的 css/base.css 中，
组件中的index.js不引入样式

## components
这里存放的是社区公用的组件库，样式不统一打包，按需打包到各个项目的样式文件中

每个组件按文件夹存放，样式引入到组件中的 index.js 中，
并且最终汇总到 components/index.js 中，由这个文件统一 export 到项目中用。

## css
最终要打包的样式文件都放在这个文件夹中，其他的样式都汇总到这些样式文件中。

## projects
这里存放着各个子站的代码，按项目名存放，目前有 portal、column、ask、dev 等
这里的项目名对应 css 文件夹中的 样式文件，如 column 项目在 css 文件夹里就有 column.css 样式文件，用来汇总这个项目的所有样式。

### 项目文件夹说明，以专栏为例 column
#### components
项目中公用的组件代码，与最外层的 components 的规则一致

#### pages
各个页面的代码，按文件夹存放，文件夹名对应页面的名字。

各个页面文件夹中都有个 index.js ，在这里把当前页面所引用的样式都汇总在这里，具体见文件代码。

# 样式文件打包说明
base 文件夹中的样式统一打包进 css/base.css 中
components 中的样式不统一打包，全都由各个项目来统一打包
css 这里的样式文件单独打包，不汇总
project 这里每个项目在 css 文件夹中都有对应的样式，最终按 css 里的文件来逐个打包

# 脚手架命令行
ccat project [name]：项目根目录下输入
    新建一个项目文件夹，
    比如本示例的pc文件夹

ccat subProject [name]：项目根目录下输入
    在 pc/src/projects 文件夹下新建子项目文件夹，并且在 pc/css 文件夹下新建样式文件，
    比如 projects/column 和 css/column.css

ccat base [name]：名称建议首字母大写：项目根目录下输入
    在 pc/base 文件夹下新建组件，并且在 css/base.css 文件中引入组件的样式文件，
    比如新建了 base/reset ，在 css/base.css 文件中自动填入 `@import '../css/base/reset/reset.css';`

ccat component [name]：可以在三个地方输入：项目根目录、子项目根目录、页面根目录（先完成前两个，后面一个暂时不要，采用不同命令处理）
    在对应的根目录下的 components 文件夹下新建组件，并且将组件引入到 components 根目录下的 index.js 中。
    比如在 pc/src 下输入 ccat component AskPanels，则在 pc/src/components 里就新建了 AskPanels 组件，并且在 pc/src/components/index.js 中自动写入以下代码
    `
    import AskPanels from './AskPanels';

    export {
        AskPanels,
    };
    `

npm run start：项目根目录下输入
    运行整个项目

npm run build：项目根目录下输入(需要有按项目build的方法，在config.js里做开关处理)
    将 src/index.js、src/index.html、src/projects/[subProjectName]/index.js 逐个打包输出到 pc/build 文件夹中。
    将 css 文件夹下的样式文件逐个打包输出到 pc/build/css 下，
    将 css/img 文件夹下的图片都逐个输出到 pc/build/css/img 下
    将 components、projects 下的图片文件夹（判断是否有 img 文件夹）都输出到 build 文件夹对应的目录中（比如 src/components/AskPanels/img 输出到 build/components/AskPanels/img 中）

