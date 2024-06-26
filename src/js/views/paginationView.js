import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler){
    this._parentElement.addEventListener('click',function (e){
        const btn =e.target.closest('.btn--inline')
        if(!btn) return
        const goToPage = +btn.dataset.goto;
        console.log(goToPage);
        handler(goToPage)
    })
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    if (curPage === 1 && numPages > 1) {
      return this._generateButtonMarkup('next', curPage + 1);
    } else if (curPage === numPages && numPages > 1) {
      return this._generateButtonMarkup('prev', curPage - 1);
    } else if (curPage < numPages) {
      return `
        ${this._generateButtonMarkup('prev', curPage - 1)}
        ${this._generateButtonMarkup('next', curPage + 1)}
      `;
    }
    return '';
  }

  _generateButtonMarkup(type, page) {
    return `
      <button data-goto=${page} class="btn--inline pagination__btn--${type}">
        ${type === 'prev' ? `
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>${page}</span>
        ` : `
          <span>${page}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        `}
      </button>
    `;
  }
}

export default new PaginationView();