(function () {
    window.addEventListener('DOMContentLoaded', function () {
      let menuRootEl = document.querySelector('.main-navigation-catalog_list ul');
  
      if ( menuRootEl ) {
        const resInfo = menuAim(menuRootEl, {
          activate: activateSubmenu,
          deactivate: deactivateSubmenu,
          activeRow: document.querySelector('[data-submenu-id="sm1"]'),
        });
      }
  
      function overlayToggle() {
        const overlayEl = document.querySelector('.overlay');
        overlayEl.classList.toggle('show');
      }
  
      const btnCatalog = document.querySelector('#btnCatalog');
      if (btnCatalog) {
        btnCatalog.addEventListener('click', toggleCatalog);
      }
  
      function toggleCatalog(event) {
        event.preventDefault();
  
        if (event.target.closest('.btn-catalog')) {
          event.target.closest('.btn-catalog').querySelector('.icon-menu').classList.toggle('open');
        }
  
        const navCatalog = document.querySelector('#navCatalog');
        const navTop = document.querySelector('.main-navigation').getBoundingClientRect().top;
        const navHeight = document.querySelector('.main-navigation').getBoundingClientRect().height;
  
        navCatalog.classList.toggle('show');
        navCatalog.style.top = `${navTop + navHeight}px`;
  
        overlayToggle();
      }
  
      function activateSubmenu(row) {
        let submenuId = row.dataset.submenuId;
        let submenu = document.querySelector(`#${submenuId}`);
  
        let styles = {
          display: 'block',
        };
        if (submenu) Object.assign(submenu.style, styles);
        row.classList.add('show');
      }
  
      function deactivateSubmenu(row) {
        let submenuId = row.dataset.submenuId;
        let submenu = document.querySelector(`#${submenuId}`);
  
        let styles = {
          display: 'none',
        };
        if (submenu) {
          Object.assign(submenu.style, styles);
          [...submenu.querySelectorAll('.sub-expand.open')].forEach(span => span.click())
        }
        row.classList.remove('show');
      }
  
      document.addEventListener('click', (e) => {
        const overlay = document.querySelector('.overlay');
        const navCatalog = document.querySelector('#navCatalog');
        const target = e.target;
  
        /* if (!target.closest('#navCatalog') && !target.closest('#btnCatalog')) {
          console.log();
          document
            .querySelector('#btnCatalog .icon-menu')
            .classList.remove('open');
          navCatalog.classList.remove('show');
          overlay.classList.remove('show');
        } */
      });
  
      function addExpandButton(prevSubmenu) {
        const arrListSubcatalog = document.querySelectorAll(
          '.main-navigation-catalog_sub-list'
        );
  
        arrListSubcatalog.forEach((list) => {
          const listArr = [...list.children];
          const lastItem = listArr[listArr.length - 1];
  
          if (listArr.length > 5) {
            const isExpand = lastItem.children[0].classList.contains('sub-expand')
  
            if (isExpand) return false;
  
            let stopItem = listArr[4];
            listArr.forEach(() => {
              stopItem.dataset.hideNext = '';
            });
  
            let li = document.createElement('li');
            let span = document.createElement('span');
  
            span.classList.add('sub-expand');
            span.innerHTML = 'Еще';
            li.append(span);
            list.append(li);
  
            span.addEventListener('click', (event) => {
              let target = event.target;
              target.classList.toggle('open');
              stopItem.toggleAttribute('data-hide-next');
              if (target.classList.contains('open')) {
                target.textContent = 'Свернуть';
              } else {
                target.textContent = 'Еще';
              }
            });
          }
        });
      }
      addExpandButton();
  
      const tabsList = document.querySelectorAll('.tabs-block');
      if (tabsList) {
        tabsList.forEach(tab => {
          tab.querySelector('.tabs-block-nav li:first-child a').classList.add('active');
          tab.querySelector(`.tabs-block-item:first-child`).classList.add('active');
  
          tab.addEventListener('click', (event) => {
            if (event.target.classList.contains('tabs-block-item-btn')) {
              let tabKey = event.target.dataset.key;
              const tabNavItemsList = tab.querySelectorAll('.tabs-block-nav li a');
              tabNavItemsList.forEach(tabItem => {
                tabItem.classList.remove('active');
              });
  
              const tabItemsList = tab.querySelectorAll('.tabs-block-item');
              tabItemsList.forEach(tabItem => {
                tabItem.classList.remove('active');
              });
  
              event.target.classList.add('active');
              tab.querySelector(`.tabs-block-item[data-key='${tabKey}']`).classList.add('active');
            }
          });
        });
      }
    });
  
    document.querySelector('body').addEventListener('click', (event) => {
      let target = event.target;
  
      if (target.closest('.form-filters-question'))
        return true;
  
      if (target.classList.contains('form-control-helper--radio')) {
        if (target.previousElementSibling.checked !== true) {
          target.previousElementSibling.checked = true;
        }
      } else if(target.classList.contains('form-control-helper--checkbox')) {
        if(target.previousElementSibling.checked === true) {
          target.previousElementSibling.checked = false;
        } else {
          target.previousElementSibling.checked = true;
        }
      }
    });
  
    Fancybox.bind('[data-modalbblock]', {
      closeButton: 'outside',
    });
  
    function formFiltersListSliderHeightInit(array) {
      array.forEach((element) => {
        if (element.closest('.form-filters-list-wrap--slider').classList.contains('active')) {
          setTimeout(() => {
            element.style.height = `${element.querySelector('.form-filters-list__inner').clientHeight + 3}px`;
          }, 100)
        }
      });
    }
  
    const formFiltersListSlider = document.querySelectorAll('.form-filters-list-wrap--slider');
    formFiltersListSliderHeightInit(formFiltersListSlider);
  
    document.querySelector('body').addEventListener('click', (event) => {
      let target = event.target;
  
      if (target.closest('.form-filters-question'))
        return false;
  
      if (target.closest('.form-filters__title')) {
        target = target.closest('.form-filters__title');
      }
  
      if (target.classList.contains('form-filters__title') && target.nextElementSibling.classList.contains('form-filters-list-wrap--slider') ) {
        target.classList.toggle('active');
        let container = target.nextElementSibling;
  
        if (!container.classList.contains('active')) {
          container.classList.add('active');
          container.style.height = 'auto';
  
          let height = `${container.clientHeight}px`;
  
          container.style.height = '0px';
  
          setTimeout(function () {
            container.style.height = height;
          }, 0);
        } else {
          container.style.height = '0px';
  
          container.addEventListener('transitionend', function () {
             container.classList.remove('active');
          }, {
            once: true
          });
        }
      }
    });
  
    document.querySelector('body').addEventListener('click', (event) => {
      let target = event.target;
      if (target.closest('.btn-show-list')) {
        target = target.closest('.btn-show-list');
      }
  
      let targetBlock = target.closest('.form-filters__item');
  
      if (target.classList.contains('btn-show-list')) {
        if (!targetBlock.querySelector('.form-filters-list').classList.contains('showed')) {
          target.classList.add('active');
          targetBlock.querySelector('.form-filters-list').classList.add('showed');
          target.querySelector('.btn-show-list__text--more').style.display = 'none';
          target.querySelector('.btn-show-list__text--less').style.display = 'block';
        } else {
          target.classList.remove('active');
          targetBlock.querySelector('.form-filters-list').classList.remove('showed');
          target.querySelector('.btn-show-list__text--more').style.display = 'block';
          target.querySelector('.btn-show-list__text--less').style.display = 'none';
        }
        formFiltersListSliderHeightInit(formFiltersListSlider);
      }
    });
  
    document.querySelector('body').addEventListener('click', (event) => {
      let target = event.target;
  
      if (target.closest('.form-filters-match-info__close')) {
        target.closest('.form-filters-match-info').classList.remove('showed');
      }
    });
  
    document.querySelector('body').addEventListener('change', (event) => {
      let target = event.target;
      let formFiltersMatchInfo = document.querySelector('.form-filters-match-info');
  
      if (formFiltersMatchInfo && target.closest('.form-filters') && (target.closest('.form-control') || target.closest('.form-control-helper'))) {
        let targetPositionY = target.getBoundingClientRect().top - (+document.querySelector('.form-filters').getBoundingClientRect().top + 18);
  
        formFiltersMatchInfo.classList.add('showed');
        formFiltersMatchInfo.style.top = `${targetPositionY}px`;
      }
    });
  
    document.querySelector('html').addEventListener('click', (event) => {
       let target = event.target;
       let formFiltersMatchInfo = document.querySelector('.form-filters-match-info');
  
      if (formFiltersMatchInfo && (!(target.closest('.form-control-label') || target.closest('.form-control') || target.closest('.form-control-helper')))) {
  
        if(formFiltersMatchInfo.classList.contains('showed')) {
          formFiltersMatchInfo.classList.remove('showed');
        }
      }
    });
  
    document.querySelector('body').addEventListener('click', (event) => {
      let target = event.target;
      let questionsHiddenContent = document.querySelectorAll('.form-filters-question-hidden');
  
      if (target.closest('.form-filters-question')) {
        let hiddenContent = target.closest('.form-filters-question').querySelector('.form-filters-question-hidden');
        questionsHiddenContent.forEach((item) => {
          item.classList.remove('showed');
        });
  
        if (!hiddenContent.classList.contains('showed')) {
          hiddenContent.classList.add('showed');
        } else {
          hiddenContent.classList.remove('showed');
        }
      } else {
        questionsHiddenContent.forEach((item) => {
          item.classList.remove('showed');
        });
      }
    });
  
    document.querySelector('body').addEventListener('click', (event) => {
      let target = event.target;
      let formFiltersExtBlock = document.querySelector('.form-filters__ext');
  
      if (target.closest('.form-filters-btn-ext')) {
        target.closest('.form-filters-btn-ext').style.display = 'none';
        formFiltersExtBlock.classList.add('showed');
        formFiltersExtBlock.style.height = 'auto';
  
        let height = `${formFiltersExtBlock.clientHeight}px`;
  
        formFiltersExtBlock.style.height = '0px';
  
        setTimeout(function () {
          formFiltersExtBlock.style.height = height;
        }, 0);
        setTimeout(function () {
          formFiltersExtBlock.style.overflow = 'initial';
        }, 100);
      }
    });
  
  })();
  
  function sp(shopid) {
  
    if (window.devdebug) {
      return;
    }
  
    $.ajax({
      "url": `https://statistics-partner.pro-katalog.ru/api/add-visit?shop_id=${shopid}`,
      "method": "GET",
      "timeout": 0,
      "headers": {
        "Accept": "application/json",
        "Authorization": "Bearer 1|BgbeJFRNZL95Jk8QqKuYSIApHsqSMzQOTyqoblqX"
      },
      // "dataType": "json"
    }).done(function (response) {
      // console.log(response);
    });
  }
  