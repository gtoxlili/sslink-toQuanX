function doGet(e) {
    var cslink = e.parameters.url
    var xs = UrlFetchApp.fetch(cslink).toString()
    var decoded = Utilities.newBlob(Utilities.base64Decode(xs)).getDataAsString();
    var namelist = [];
    if (decoded.slice(0, 6) == "ssr://") {
        decoded.replace(/ssr:\/\/(.*)/g, function (x, y) {
            namelist.push(Utilities.newBlob(Utilities.base64Decode(fananquan(y))).getDataAsString());
        })
        var tagname = Utilities.newBlob(Utilities.base64Decode(fananquan(/group=(.+)/.exec(namelist[0])[1]))).getDataAsString();
        namelist = namelist.map(function (x) { return Utilities.newBlob(Utilities.base64Decode(fananquan(/remarks=(.+?)&group/.exec(x)[1]))).getDataAsString() })
    }
    else {
        var tagname = Utilities.newBlob(Utilities.base64Decode(/group=(.+?)#/.exec(decoded)[1])).getDataAsString();
        decoded.replace(/group=.+?#(.+)/g, function (x, y) {
            namelist.push(decodeURIComponent(y));
        })
    }
    var quanxmodel = DocumentApp.openById('1P2Tys53dyQgh1q3yELww--nezFt46b3etSoCA3H9Fwg').getBody().getText()
    var change1 = quanxmodel.replace(/thisisnamelist/g, namelist.join())
    var change2 = change1.replace(/thisistabname/, cslink + ",tag=" + tagname + ",enabled=true")
    return ContentService.createTextOutput(change2)
}

function fananquan(e) {
    e = e.replace(/\-/g, "+");
    e = e.replace(/\_/g, "/");
    return e
}