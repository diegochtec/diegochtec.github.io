let model, labels;

const classify = async (inputs) => {
  const results = await model.classify(inputs);
  return inputs.map((d, i) => {
    const obj = {'text': d};
    results.forEach((classification) => {
      obj[classification.label] = classification.results[i].match;
    });
    return obj;
  });
};


const predict = async () => {
  model = await toxicity.load();
  labels = model.model.outputNodes.map(d => d.split('/')[0]);
  const text = document.querySelector('#classify-new-text-input').value;
  var toxicityTable = document.getElementById("toxicityTable");

  const predictions = classify([text]).then(prediction => {
    prediction.forEach(x => {
      var row = toxicityTable.insertRow(-1);
      console.log(x);
      var cont = 0;
      
      for (let i in x) {
        var cell = row.insertCell(cont);
        console.log(x[i])
        cell.innerHTML = x[i];
        cont++;
      }

    });
  });
  
}

