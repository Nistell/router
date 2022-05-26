

document.getElementById('button').addEventListener('click', async () => {
   const response = await fetch('/index', {
       method: 'POST',
       headers: {
           'Content-Type': 'application/json'
       },
       body: JSON.stringify({
         login: document.getElementById('log').value,
         pass: document.getElementById('ps').value,
         capcha: document.getElementById('num').value
       })
   });
   const data = await response.json();
   console.log(data);
   document.getElementById('tarif').innerHTML = await data[0].tarif;
   document.getElementById('chet').innerHTML = await data[0].id;
   document.getElementById('money').innerHTML = await data[0].money;
});

setTimeout(() => {
  document.querySelector('.imgclass').src = './screen.png';
}, 4000);
