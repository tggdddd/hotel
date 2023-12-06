module.exports = (context) => {
    let append = ""
    let grep = /src=(["']@.*?["'])/
    let res;
    while ((res = grep.exec(context))) {
        let uuid = "A" + Math.random().toString(16).substring(2)
        context = context.replaceAll(res[0], `src={${uuid}}`)
        append += `import ${uuid} from ${res[1]};`
    }
    return append + context;
}