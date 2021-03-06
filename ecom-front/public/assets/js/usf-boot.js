/* USF file - Do not modify this file since it is regularly changed. Auto modified at: 9/23/2020 2:58:46 AM*/
!(function () {
  function e(e, t) {
    var n;
    if (-1 != e.indexOf('<')) {
      var r = document.createElement('div');
      (r.innerHTML = e),
        (n = 1 == r.childNodes.length ? r.firstChild : r.childNodes);
    } else n = document.createElement(e);
    return t ? $r(n) : n;
  }
  function t(t, n, r) {
    var o, s, i;
    for (s = document.getElementsByTagName('link'), i = 0; i < s.length; i++) {
      var a = s[i].href.indexOf(t);
      if (a >= 0 && a == s[i].href.length - t.length) return !1;
    }
    return (
      (o = e('link')).setAttribute('rel', 'stylesheet'),
      o.setAttribute('type', 'text/css'),
      o.setAttribute('href', t),
      n && (o.onload = n),
      r && (o.onerror = r),
      document.getElementsByTagName('head')[0].appendChild(o),
      !0
    );
  }
  function n(t, n, r, o) {
    var s, i, a;
    for (
      i = document.getElementsByTagName('script'), a = 0;
      a < i.length;
      a++
    ) {
      var c = i[a].src.indexOf(t);
      if (c >= 0 && c == i[a].src.length - t.length) return !1;
    }
    return (
      (s = e('script')).setAttribute('type', 'text/javascript'),
      s.setAttribute('src', t),
      (s.async = !0),
      o &&
        Object.keys(o).forEach(function (e) {
          s.setAttribute(e, o[e]);
        }),
      n && (s.onload = n),
      r && (s.onerror = r),
      document.head.appendChild(s),
      !0
    );
  }
  function r(e, r, o, s) {
    for (var i = 0, a = 0, c = 0; c < r.length; c++) {
      var l,
        u = r[c];
      s ? (0, (l = n)) : (l = t),
        u.startsWith('http') || u.startsWith('//') || (u = e + u),
        l(u, function () {
          ++i === a && o();
        }) && a++;
    }
    a === i && o();
  }
  $r_closest = function (e, t) {
    for (; e; ) {
      if (!e || e === document.body) return;
      if ((e = e.parentNode) && e.classList.contains(t)) return e;
    }
  };
  var o = document.attachEvent,
    s = document.detachEvent;
  function i(e, t, n) {
    s
      ? e.detachEvent('on' + t, n)
      : e.removeEventListener && e.removeEventListener(t, n, !1);
  }
  function a() {
    var e = this._chainDispose,
      t = typeof e;
    'undefined' !== t &&
      ((this.dispose = e),
      (this._chainDispose = null),
      'function' === t && this.dispose());
  }
  function c(e) {
    /complete|interactive|loaded/.test(document.readyState)
      ? e()
      : document.addEventListener('DOMContentLoaded', e, !1);
  }
  ($r_on = function (e, t, n, r, s) {
    if (!e) throw new Error('Element must be set.');
    if (e.length) for (var i = 0; i < e.length; i++) $r_on(e[i], t, n, r, s);
    else if ((e._r_events || (e._r_events = {}), 'string' == typeof t))
      n &&
        (r && 'boolean' != typeof r
          ? ((n = $r_proxy(r, n)), (r = !1))
          : s && (n = $r_proxy(e, n)),
        (function (e, t) {
          var n,
            r = 0;
          if (e.length)
            for (n = e.length; r < n && !1 !== t.call(e[r], e[r], r); r++);
          else for (r in e) if (!1 === t.call(e[r], r, e[r])) break;
        })(t.split(' '), function (t) {
          !(function (e, t, n, r) {
            var s,
              i = e._r_events[t];
            i || (e._r_events[t] = i = []);
            o
              ? ((s = function () {
                  var t = {};
                  try {
                    t = (function (e) {
                      var t = e.ownerDocument || e.document || e;
                      return t.defaultView || t.parentWindow;
                    })(e).event;
                  } catch (e) {}
                  return n.call(e, t);
                }),
                e.attachEvent('on' + t, s))
              : e.addEventListener &&
                ((s = function (t) {
                  return n.call(e, t);
                }),
                e.addEventListener(t, s, !1));
            if (
              ((i[i.length] = { handler: n, browserHandler: s, autoRemove: r }),
              r)
            ) {
              var c = e.dispose;
              c !== a &&
                ((e.dispose = a), void 0 !== c && (e._chainDispose = c));
            }
          })(e, t, n, r);
        }));
    else
      for (var c in t) {
        var l = t[c];
        n && (l = $r_proxy(n, l)), $r_on(e, c, l, r || !1);
      }
  }),
    ($r_off = function (e, t, n, r, o) {
      if (e._r_events && t) {
        var s = null,
          a = e._r_events[t] || [];
        if (void 0 !== n) {
          for (var c = 0, l = a.length; c < l; c++)
            if (a[c].handler === n) {
              s = a[c].browserHandler;
              break;
            }
          i(e, t, s), a.splice(c, 1);
        } else if ('string' == typeof t) {
          for (c = 0, l = a.length; c < l; c++)
            i(e, t, (s = a[c].browserHandler));
          delete e._r_events[t];
        } else
          for (var u in t) {
            n = t[u];
            for (c = 0, l = (a = e._r_events[u] || []).length; c < l; c++)
              if (a[c].handler === n) {
                s = a[c].browserHandler;
                break;
              }
            i(e, u, s), a.splice(c, 1);
          }
      }
    }),
    ($r_click = function (e) {
      if (document.createEvent) {
        var t = document.createEvent('MouseEvents');
        t.initEvent('click', !0, !1), e.dispatchEvent(t);
      } else document.createEventObject && e.fireEvent('onclick');
    });
  var l = function () {
    this.list = {};
  };
  function u(e) {
    v && ((v = []), delete v), usf.event.raise('is_hide', e);
  }
  function f(e, t) {
    b(function () {
      !(function (e, t) {
        if ($r_closest(e, 'usf-sr-inputbox') && usf.platform.collection) return;
        (t || e.value) && usf.event.raise('is_show', e);
      })(e, t);
    });
  }
  (l.prototype = {
    add(e, t) {
      if (Array.isArray(e)) e.forEach((e) => this.add(e, t));
      else {
        var n = this.list[e];
        n || (this.list[e] = n = []), n.push(t);
      }
    },
    remove(e, t) {
      t || delete this.list[e];
      var n = this.list[e];
      n.splice(n.indexOf(t), 1);
    },
    raise(e, t, n) {
      var r = this.list[e];
      r && r.forEach((e) => e(t, n));
    },
  }),
    window.usf || (window.usf = {}),
    (usf.components = {}),
    (usf.collectionsByTitle = {}),
    (usf.collectionsByUrlName = {}),
    (usf.EventHub = l),
    (usf.utils = {
      loadJsFile: n,
      loadFiles: r,
      ready: c,
      installSearchInput: _,
      hideInstantSearch: u,
      loadAndShowInstantSearch: f,
      stopEvent: (e, t) =>
        !!e &&
        (e.preventDefault && e.preventDefault(),
        t || (e.stopPropagation && e.stopPropagation(), (e.cancelBubble = !0)),
        (e.returnValue = !1),
        !1),
    });
  var d,
    h,
    v,
    p = (usf.settings = {
      storeId: 'case-chimp.mythemobilecase.com',
      siteId: 'd91dddd9-aa2b-4635-a2a3-f9a7b48cc050',
      appUrl: 'https://search-app.sobooster.com',
      analyticsApiUrl: 'https://analytics.hotyon.com/set',
      searchSvcUrl: 'https://svc-0-search-app.hotyon.com/',
      resUrl:
        'https://search-app.sobooster.com/Sites/_root/Apps/2a000000-e000-4000-1000-100000000000/Storefront/Default/',
      enabledPlugins: ['review-themobilecase', 'label-flair'],
      currency: 'GBP',
      priceLongFormat: '<span class="money">??{0} GBP</span>',
      priceFormat: '<span class="money">??{0}</span>',
      mobileBreakpoint: 767,
      decimals: 2,
      decimalDisplay: '.',
      thousandSeparator: ',',
      useTrailingZeros: 1,
      plugins: { 'preview-usf': { displayType: { Size: 'select' } } },
      online: 1,
      version: '1.0.1.4111',
      revision: 9296978,
      searchSvcUrl: 'https://svc-0-search-app.hotyon.com/',
      filters: {},
      instantSearch: {
        online: 1,
        searchBoxSelector: 'input[name=q]',
        numOfSuggestions: 10,
        numOfProductMatches: 4,
        numOfCollections: 4,
      },
      search: {
        online: 1,
        sortFields: 'bestselling,-date,date,',
        searchResultsUrl: '/pages/search-results',
        more: 'infinite',
        itemsPerPage: 20,
        imageSizeType: 'original',
        imageSize: 600,
        showSearchInputOnSearchPage: 1,
        canChangeUrl: 1,
      },
      collections: { online: 1, collectionsPageUrl: '/pages/collections' },
      filterNavigation: { showFilterArea: 1 },
      translation: {
        viewAllResultsFor:
          'view all results for <span class=\u0022usf-highlight\u0022>{0}</span>',
        noMatchesFoundFor:
          'No matches found for \u0022<b>{0}</b>\u0022. Please try again with a different term.',
        productSearchResultWithTermSummary:
          '<b>{0}</b> results for \u0027<b>{1}</b>\u0027',
        productSearchResultSummary: '<b>{0}</b> products',
        productSearchNoResults:
          '<h2>No matching for \u0027<b>{0}</b>\u0027.</h2><p>But don\u0027t give up ??? check the filters, spelling or try less specific search terms.</p>',
        productSearchNoResultsEmptyTerm:
          '<h2>No results found.</h2><p>But don\u0027t give up ??? check the filters or try less specific terms.</p>',
        clearAll: 'Clear all',
        clear: 'Clear',
        sortBy_: 'Relevance',
        sortBy_title: 'Title: A-Z',
        'sortBy_-title': 'Title: Z-A',
        sortBy_date: 'Date: Old to New',
        'sortBy_-date': 'Date: New to Old',
        sortBy_price: 'Price: Low to High',
        'sortBy_-price': 'Price: High to Low',
        'sortBy_-discount': 'Discount: High to Low',
        sortBy_bestselling: 'Bestselling',
        'sortBy_-available': 'Inventory: High to Low',
        filters: 'Filters',
        filterOptions: 'Filter options',
        clearFilterOptions: 'Clear all filter options',
        youHaveViewed: 'You\u0027ve viewed {0} of {1} products',
        loadMore: 'Load more',
        productMatches: 'Product matches',
        searchSuggestions: 'Search suggestions',
        quantity: 'Quantity',
        selectedVariantNotAvailable: 'The selected variant is not available.',
        addToCart: 'Add to cart',
        seeFullDetails: 'See full details',
        chooseOptions: 'Choose options',
        quickView: 'Quick view',
        sale: 'Sale',
        save: 'Save',
        soldOut: 'Sold out',
        viewItems: 'Apply Filter',
        more: 'More',
        all: 'All',
        prevPage: 'Previous page',
        gotoPage: 'Go to page {0}',
        nextPage: 'Next page',
        from: 'From',
        'sortBy_option:Case Type': 'Case Type: A-Z',
        'sortBy_-option:Case Type': 'Case Type: Z-A',
        'sortBy_option:Phone': 'Phone: A-Z',
        'sortBy_-option:Phone': 'Phone: Z-A',
      },
    });
  function m(e) {
    if (!e.target._usf_no_popup) {
      var t = e.target;
      t.value ? f(t) : u(t);
    }
  }
  function _(e, t) {
    if (e) {
      var n = p.instantSearch.online,
        r = p.search.online;
      if (n || r) {
        var o = e.parentNode;
        if (!o.classList.contains('usf-sr-inputbox')) {
          var s = e.cloneNode(!0);
          o.insertBefore(s, e), o.removeChild(e), (e = s);
        }
        for (; 'FORM' !== o.tagName; )
          if ((o = o.parentNode) === document.body) {
            o = null;
            break;
          }
        if (
          ((d = p.search.searchResultsUrl),
          o &&
            (r && (o.action = d),
            (o.onsubmit = function (t) {
              var n = window.usf_container;
              return (
                location.pathname.includes(d) ||
                (n && $r_closest(e, 'usf-sr-inputbox'))
                  ? (usf.query.update({ q: e.value }, [/_uff_.*/, /_usf_.*/], {
                      force: !0,
                    }),
                    n && $r_click(n),
                    u(e))
                  : (location = d + '?q=' + encodeURIComponent(e.value)),
                usf.utils.stopEvent(t)
              );
            })),
          (e._usf_no_popup = t),
          e.setAttribute('autocomplete', 'off'),
          n)
        ) {
          var i = t
            ? null
            : function (e) {
                if (usf.isMobile)
                  return f(e.target, !0), usf.utils.stopEvent(e);
                f(e.target);
              };
          $r_on(e, {
            input: m,
            keydown: function (e) {
              13 === e.keyCode &&
                (usf.utils.stopEvent(e),
                o
                  ? o.onsubmit()
                  : (location =
                      d + '?q=' + encodeURIComponent(e.target.value)));
            },
            click: i,
            touchstart: i,
            focus: i,
            blur: function (e) {
              usf.isMobile || u(e.target);
            },
          });
        }
      }
    }
  }
  function b(e) {
    if (2 !== h)
      if (1 !== h) {
        var t;
        h = 1;
        var n = [
            (t = _usfTheme.assetUrl.replace('usf-boot.js', '{0}')).replace(
              '{0}',
              'usf.js'
            ),
          ],
          o = [t.replace('{0}', 'usf.css')];
        r(
          t,
          n,
          function () {
            (h = 2),
              v && (v.forEach((e) => e()), delete v),
              (d = p.search.searchResultsUrl),
              e && e(),
              c(function () {
                usf.event.raise('init');
              });
          },
          1
        ),
          r(t, o, function () {}, 0);
      } else e && (v || (v = []), v.push(e));
    else e && e();
  }
  if (
    ((p.currencyRate = 1),
    -1 !== location.search.indexOf('_usf_preview=1') && (p.online = 1),
    p.online)
  ) {
    (usf.event = new l()),
      _usfTheme.applied && (p.search.searchResultsUrl = '/search');
    var g = location.pathname,
      y = -1 !== g.indexOf('/collections/') && -1 === g.indexOf('/products/'),
      E = y
        ? p.collections.online
        : -1 !== g.indexOf(p.search.searchResultsUrl) && p.search.online;
    E && b(),
      c(function () {
        var e = document.body.classList;
        (usf.isMobile = document.body.clientWidth < p.mobileBreakpoint) &&
          e.add('usf-mobile'),
          window.usf_container &&
            (E || b(),
            e.add('usf-has-container'),
            y && e.add('usf-collections-page'),
            e.add(p.filters.horz ? 'usf-horz-layout' : 'usf-vert-layout')),
          e.add(
            'usf-theme-fix-' +
              (function (e) {
                e = e.toLowerCase();
                for (var t, n = '', r = 0; r < e.length; r++) {
                  var o = e[r];
                  (o < 'a' || o > 'z') && (o = '_'),
                    '_' !== o && (t = r),
                    (n += o);
                }
                return n.substring(0, t + 1);
              })(_usfTheme.name)
          ),
          document.body
            .querySelectorAll(p.instantSearch.searchBoxSelector)
            .forEach((e) => _(e));
      });
  }
})();
