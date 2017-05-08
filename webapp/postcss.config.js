module.exports = {
    plugins: [
        require("autoprefixer")({
            browsers: ['ie>=8', '>1% in CN']
        }),
        require('postcss-px2rem')({remUnit: 37.5})
    ]
};
