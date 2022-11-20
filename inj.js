document.querySelector('.search').addEventListener('mousedown', function () {
  document.getElementById('msearchBg1232').style.display = "block";
  document.querySelector('#appPrsearch').style.display = "block";
  setTimeout(() => {document.getElementsByClassName("search_input")[0].focus();window.scrollTo(0, 0);}, 500);
}, false);
document.body.insertAdjacentHTML("afterbegin", '<div id="msearchBg1232" style="display:none;"></div>');

var msearchBg1232 = document.getElementById('msearchBg1232');
msearchBg1232.insertAdjacentHTML("afterEnd", '<div id="appPrsearch" style="display:none;"></div>');

(function (w, d, u2, u3, u) {
  var s = d.createElement('script');
  s.async = true;
  s.src = u + '?' + (Date.now() / 60000 | 0);
  s.setAttribute('id', 'appPrsearchScript');

  // s.setAttribute('data-tov_layout', 'list');
  s.setAttribute('data-tov_layout', 'grid');
  s.setAttribute('data-tov_fprev', 1);

  var h = d.getElementsByTagName('script')[0];
  h.parentNode.insertBefore(s, h);
  var s2 = d.createElement('link');
  s2.href = u2 + '?' + (Date.now() / 60000 | 0);
  s2.rel = 'stylesheet';
  s2.type = 'text/css';
  var h2 = d.getElementsByTagName('link')[0];
  h2.parentNode.insertBefore(s2, h2);

  var s3 = d.createElement('link');
  s3.href = u3 + '?' + (Date.now() / 60000 | 0);
  s3.rel = 'stylesheet';
  s3.type = 'text/css';
  var h3 = d.getElementsByTagName('link')[0];
  h3.parentNode.insertBefore(s3, h3);
})(window, document, 'https://i.msearch.space/app/646ca7c4b2c8f3951bf77ef8d3b06020/app.css','https://i.msearch.space/app/646ca7c4b2c8f3951bf77ef8d3b06020/main.css','https://i.msearch.space/app/646ca7c4b2c8f3951bf77ef8d3b06020/app.js');

// Удаление фона
document.querySelector('#msearchBg1232').addEventListener('mousedown', function () {this.style.display = "none";document.querySelector('#appPrsearch').style.display = "none";document.getElementsByClassName("search_input")[0].value='';}, false);

// PlaceHolder
// function typeWriter(e,t,r=!1,o=0,u=0,i=100){o||(r?document.querySelector(e).placeholder="":document.querySelector(e).innerHTML=""),txt=t[u],o<txt.length?(r?document.querySelector(e).placeholder+=txt.charAt(o):document.querySelector(e).innerHTML+=txt.charAt(o),o++,setTimeout(typeWriter,i,e,t,r,o,u)):void 0===t[++u]?setTimeout(typeWriter,5*i,e,t,r):(o=0,setTimeout(typeWriter,3*i,e,t,r,o,u))}timeout_var=null,text_list=["Умный поиск - Введите запрос"],return_value=typeWriter(".search",text_list,!0);

