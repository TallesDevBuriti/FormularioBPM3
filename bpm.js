this.workflowCockpit = workflowCockpit({
    init: _init,
    onSubmit: _saveData,
    onError: _rollback
});

function _init(data, info) {
    if (data && data.loadContext) {
        const { initialVariables } = data.loadContext;
        console.log("initialVariables: " + JSON.stringify(initialVariables));
    }
    
    info
        .getUserData()
        .then(function (user) {
            document.querySelector("#nomFun").setAttribute("value", user.fullname);
        })
        .then(function () {
        info.getPlatformData().then(function (platformData) {
            console.log(platformData);
        });
    });
}

function _saveData(data, info) {

    let newData = {};
    let selectArea = document.getElementById("#areaEmp");
    let selectRegArea = document.getElementById("#regArea");
  
    // Aba 1
    newData.nomFun = document.querySelector("#nomFun").value;
    newData.area = selectArea.options[selectArea.selectedIndex].value;
    newData.dataEntrada = document.querySelector("#dataEntrada").value;

    // Aba 2
    newData.regArea = selectRegArea.options[selectRegArea.selectedIndex].value;
    newData.cepArea = document.querySelector("#cepArea").value;
    newData.cepEstado = document.querySelector("#cepEstado").value;
    newData.municipio = document.querySelector("#municipio").value;
    newData.areaHect = document.querySelector("#areaHect").value;
    newData.areaMQ = document.querySelector("#areaMQ").value;
 
    console.log(newData);
    return {
      formData: newData,
    };
}

function _rollback(data, info) {
    console.log(data.error);
    if (info.isRequestNew()) {
       return removeData(data.processInstanceId);
    }
    return rollbackData(data.processInstanceId);
}