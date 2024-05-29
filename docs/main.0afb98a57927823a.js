"use strict";
(self.webpackChunkportfolio_padrao_db =
  self.webpackChunkportfolio_padrao_db || []).push([
  [179],
  {
    601: () => {
      function re(e) {
        return "function" == typeof e;
      }
      function Gi(e) {
        const n = e((r) => {
          Error.call(r), (r.stack = new Error().stack);
        });
        return (
          (n.prototype = Object.create(Error.prototype)),
          (n.prototype.constructor = n),
          n
        );
      }
      const Is = Gi(
        (e) =>
          function (n) {
            e(this),
              (this.message = n
                ? `${n.length} errors occurred during unsubscription:\n${n
                    .map((r, i) => `${i + 1}) ${r.toString()}`)
                    .join("\n  ")}`
                : ""),
              (this.name = "UnsubscriptionError"),
              (this.errors = n);
          }
      );
      function Fr(e, t) {
        if (e) {
          const n = e.indexOf(t);
          0 <= n && e.splice(n, 1);
        }
      }
      class Ue {
        constructor(t) {
          (this.initialTeardown = t),
            (this.closed = !1),
            (this._parentage = null),
            (this._finalizers = null);
        }
        unsubscribe() {
          let t;
          if (!this.closed) {
            this.closed = !0;
            const { _parentage: n } = this;
            if (n)
              if (((this._parentage = null), Array.isArray(n)))
                for (const o of n) o.remove(this);
              else n.remove(this);
            const { initialTeardown: r } = this;
            if (re(r))
              try {
                r();
              } catch (o) {
                t = o instanceof Is ? o.errors : [o];
              }
            const { _finalizers: i } = this;
            if (i) {
              this._finalizers = null;
              for (const o of i)
                try {
                  up(o);
                } catch (s) {
                  (t = t ?? []),
                    s instanceof Is ? (t = [...t, ...s.errors]) : t.push(s);
                }
            }
            if (t) throw new Is(t);
          }
        }
        add(t) {
          var n;
          if (t && t !== this)
            if (this.closed) up(t);
            else {
              if (t instanceof Ue) {
                if (t.closed || t._hasParent(this)) return;
                t._addParent(this);
              }
              (this._finalizers =
                null !== (n = this._finalizers) && void 0 !== n ? n : []).push(
                t
              );
            }
        }
        _hasParent(t) {
          const { _parentage: n } = this;
          return n === t || (Array.isArray(n) && n.includes(t));
        }
        _addParent(t) {
          const { _parentage: n } = this;
          this._parentage = Array.isArray(n) ? (n.push(t), n) : n ? [n, t] : t;
        }
        _removeParent(t) {
          const { _parentage: n } = this;
          n === t ? (this._parentage = null) : Array.isArray(n) && Fr(n, t);
        }
        remove(t) {
          const { _finalizers: n } = this;
          n && Fr(n, t), t instanceof Ue && t._removeParent(this);
        }
      }
      Ue.EMPTY = (() => {
        const e = new Ue();
        return (e.closed = !0), e;
      })();
      const cp = Ue.EMPTY;
      function lp(e) {
        return (
          e instanceof Ue ||
          (e && "closed" in e && re(e.remove) && re(e.add) && re(e.unsubscribe))
        );
      }
      function up(e) {
        re(e) ? e() : e.unsubscribe();
      }
      const nr = {
          onUnhandledError: null,
          onStoppedNotification: null,
          Promise: void 0,
          useDeprecatedSynchronousErrorHandling: !1,
          useDeprecatedNextContext: !1,
        },
        Ss = {
          setTimeout(e, t, ...n) {
            const { delegate: r } = Ss;
            return r?.setTimeout
              ? r.setTimeout(e, t, ...n)
              : setTimeout(e, t, ...n);
          },
          clearTimeout(e) {
            const { delegate: t } = Ss;
            return (t?.clearTimeout || clearTimeout)(e);
          },
          delegate: void 0,
        };
      function dp(e) {
        Ss.setTimeout(() => {
          const { onUnhandledError: t } = nr;
          if (!t) throw e;
          t(e);
        });
      }
      function gl() {}
      const eM = ml("C", void 0, void 0);
      function ml(e, t, n) {
        return { kind: e, value: t, error: n };
      }
      let rr = null;
      function Ts(e) {
        if (nr.useDeprecatedSynchronousErrorHandling) {
          const t = !rr;
          if ((t && (rr = { errorThrown: !1, error: null }), e(), t)) {
            const { errorThrown: n, error: r } = rr;
            if (((rr = null), n)) throw r;
          }
        } else e();
      }
      class yl extends Ue {
        constructor(t) {
          super(),
            (this.isStopped = !1),
            t
              ? ((this.destination = t), lp(t) && t.add(this))
              : (this.destination = aM);
        }
        static create(t, n, r) {
          return new Wi(t, n, r);
        }
        next(t) {
          this.isStopped
            ? vl(
                (function nM(e) {
                  return ml("N", e, void 0);
                })(t),
                this
              )
            : this._next(t);
        }
        error(t) {
          this.isStopped
            ? vl(
                (function tM(e) {
                  return ml("E", void 0, e);
                })(t),
                this
              )
            : ((this.isStopped = !0), this._error(t));
        }
        complete() {
          this.isStopped
            ? vl(eM, this)
            : ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed ||
            ((this.isStopped = !0),
            super.unsubscribe(),
            (this.destination = null));
        }
        _next(t) {
          this.destination.next(t);
        }
        _error(t) {
          try {
            this.destination.error(t);
          } finally {
            this.unsubscribe();
          }
        }
        _complete() {
          try {
            this.destination.complete();
          } finally {
            this.unsubscribe();
          }
        }
      }
      const iM = Function.prototype.bind;
      function _l(e, t) {
        return iM.call(e, t);
      }
      class oM {
        constructor(t) {
          this.partialObserver = t;
        }
        next(t) {
          const { partialObserver: n } = this;
          if (n.next)
            try {
              n.next(t);
            } catch (r) {
              As(r);
            }
        }
        error(t) {
          const { partialObserver: n } = this;
          if (n.error)
            try {
              n.error(t);
            } catch (r) {
              As(r);
            }
          else As(t);
        }
        complete() {
          const { partialObserver: t } = this;
          if (t.complete)
            try {
              t.complete();
            } catch (n) {
              As(n);
            }
        }
      }
      class Wi extends yl {
        constructor(t, n, r) {
          let i;
          if ((super(), re(t) || !t))
            i = {
              next: t ?? void 0,
              error: n ?? void 0,
              complete: r ?? void 0,
            };
          else {
            let o;
            this && nr.useDeprecatedNextContext
              ? ((o = Object.create(t)),
                (o.unsubscribe = () => this.unsubscribe()),
                (i = {
                  next: t.next && _l(t.next, o),
                  error: t.error && _l(t.error, o),
                  complete: t.complete && _l(t.complete, o),
                }))
              : (i = t);
          }
          this.destination = new oM(i);
        }
      }
      function As(e) {
        nr.useDeprecatedSynchronousErrorHandling
          ? (function rM(e) {
              nr.useDeprecatedSynchronousErrorHandling &&
                rr &&
                ((rr.errorThrown = !0), (rr.error = e));
            })(e)
          : dp(e);
      }
      function vl(e, t) {
        const { onStoppedNotification: n } = nr;
        n && Ss.setTimeout(() => n(e, t));
      }
      const aM = {
          closed: !0,
          next: gl,
          error: function sM(e) {
            throw e;
          },
          complete: gl,
        },
        Dl =
          ("function" == typeof Symbol && Symbol.observable) || "@@observable";
      function Fn(e) {
        return e;
      }
      function fp(e) {
        return 0 === e.length
          ? Fn
          : 1 === e.length
          ? e[0]
          : function (n) {
              return e.reduce((r, i) => i(r), n);
            };
      }
      let ve = (() => {
        class e {
          constructor(n) {
            n && (this._subscribe = n);
          }
          lift(n) {
            const r = new e();
            return (r.source = this), (r.operator = n), r;
          }
          subscribe(n, r, i) {
            const o = (function uM(e) {
              return (
                (e && e instanceof yl) ||
                ((function lM(e) {
                  return e && re(e.next) && re(e.error) && re(e.complete);
                })(e) &&
                  lp(e))
              );
            })(n)
              ? n
              : new Wi(n, r, i);
            return (
              Ts(() => {
                const { operator: s, source: a } = this;
                o.add(
                  s
                    ? s.call(o, a)
                    : a
                    ? this._subscribe(o)
                    : this._trySubscribe(o)
                );
              }),
              o
            );
          }
          _trySubscribe(n) {
            try {
              return this._subscribe(n);
            } catch (r) {
              n.error(r);
            }
          }
          forEach(n, r) {
            return new (r = hp(r))((i, o) => {
              const s = new Wi({
                next: (a) => {
                  try {
                    n(a);
                  } catch (c) {
                    o(c), s.unsubscribe();
                  }
                },
                error: o,
                complete: i,
              });
              this.subscribe(s);
            });
          }
          _subscribe(n) {
            var r;
            return null === (r = this.source) || void 0 === r
              ? void 0
              : r.subscribe(n);
          }
          [Dl]() {
            return this;
          }
          pipe(...n) {
            return fp(n)(this);
          }
          toPromise(n) {
            return new (n = hp(n))((r, i) => {
              let o;
              this.subscribe(
                (s) => (o = s),
                (s) => i(s),
                () => r(o)
              );
            });
          }
        }
        return (e.create = (t) => new e(t)), e;
      })();
      function hp(e) {
        var t;
        return null !== (t = e ?? nr.Promise) && void 0 !== t ? t : Promise;
      }
      const dM = Gi(
        (e) =>
          function () {
            e(this),
              (this.name = "ObjectUnsubscribedError"),
              (this.message = "object unsubscribed");
          }
      );
      let bt = (() => {
        class e extends ve {
          constructor() {
            super(),
              (this.closed = !1),
              (this.currentObservers = null),
              (this.observers = []),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          lift(n) {
            const r = new pp(this, this);
            return (r.operator = n), r;
          }
          _throwIfClosed() {
            if (this.closed) throw new dM();
          }
          next(n) {
            Ts(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.currentObservers ||
                  (this.currentObservers = Array.from(this.observers));
                for (const r of this.currentObservers) r.next(n);
              }
            });
          }
          error(n) {
            Ts(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                (this.hasError = this.isStopped = !0), (this.thrownError = n);
                const { observers: r } = this;
                for (; r.length; ) r.shift().error(n);
              }
            });
          }
          complete() {
            Ts(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.isStopped = !0;
                const { observers: n } = this;
                for (; n.length; ) n.shift().complete();
              }
            });
          }
          unsubscribe() {
            (this.isStopped = this.closed = !0),
              (this.observers = this.currentObservers = null);
          }
          get observed() {
            var n;
            return (
              (null === (n = this.observers) || void 0 === n
                ? void 0
                : n.length) > 0
            );
          }
          _trySubscribe(n) {
            return this._throwIfClosed(), super._trySubscribe(n);
          }
          _subscribe(n) {
            return (
              this._throwIfClosed(),
              this._checkFinalizedStatuses(n),
              this._innerSubscribe(n)
            );
          }
          _innerSubscribe(n) {
            const { hasError: r, isStopped: i, observers: o } = this;
            return r || i
              ? cp
              : ((this.currentObservers = null),
                o.push(n),
                new Ue(() => {
                  (this.currentObservers = null), Fr(o, n);
                }));
          }
          _checkFinalizedStatuses(n) {
            const { hasError: r, thrownError: i, isStopped: o } = this;
            r ? n.error(i) : o && n.complete();
          }
          asObservable() {
            const n = new ve();
            return (n.source = this), n;
          }
        }
        return (e.create = (t, n) => new pp(t, n)), e;
      })();
      class pp extends bt {
        constructor(t, n) {
          super(), (this.destination = t), (this.source = n);
        }
        next(t) {
          var n, r;
          null ===
            (r =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.next) ||
            void 0 === r ||
            r.call(n, t);
        }
        error(t) {
          var n, r;
          null ===
            (r =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.error) ||
            void 0 === r ||
            r.call(n, t);
        }
        complete() {
          var t, n;
          null ===
            (n =
              null === (t = this.destination) || void 0 === t
                ? void 0
                : t.complete) ||
            void 0 === n ||
            n.call(t);
        }
        _subscribe(t) {
          var n, r;
          return null !==
            (r =
              null === (n = this.source) || void 0 === n
                ? void 0
                : n.subscribe(t)) && void 0 !== r
            ? r
            : cp;
        }
      }
      function gp(e) {
        return re(e?.lift);
      }
      function be(e) {
        return (t) => {
          if (gp(t))
            return t.lift(function (n) {
              try {
                return e(n, this);
              } catch (r) {
                this.error(r);
              }
            });
          throw new TypeError("Unable to lift unknown Observable type");
        };
      }
      function De(e, t, n, r, i) {
        return new fM(e, t, n, r, i);
      }
      class fM extends yl {
        constructor(t, n, r, i, o, s) {
          super(t),
            (this.onFinalize = o),
            (this.shouldUnsubscribe = s),
            (this._next = n
              ? function (a) {
                  try {
                    n(a);
                  } catch (c) {
                    t.error(c);
                  }
                }
              : super._next),
            (this._error = i
              ? function (a) {
                  try {
                    i(a);
                  } catch (c) {
                    t.error(c);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._error),
            (this._complete = r
              ? function () {
                  try {
                    r();
                  } catch (a) {
                    t.error(a);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._complete);
        }
        unsubscribe() {
          var t;
          if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            const { closed: n } = this;
            super.unsubscribe(),
              !n &&
                (null === (t = this.onFinalize) ||
                  void 0 === t ||
                  t.call(this));
          }
        }
      }
      function U(e, t) {
        return be((n, r) => {
          let i = 0;
          n.subscribe(
            De(r, (o) => {
              r.next(e.call(t, o, i++));
            })
          );
        });
      }
      function kn(e) {
        return this instanceof kn ? ((this.v = e), this) : new kn(e);
      }
      function vp(e) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var n,
          t = e[Symbol.asyncIterator];
        return t
          ? t.call(e)
          : ((e = (function bl(e) {
              var t = "function" == typeof Symbol && Symbol.iterator,
                n = t && e[t],
                r = 0;
              if (n) return n.call(e);
              if (e && "number" == typeof e.length)
                return {
                  next: function () {
                    return (
                      e && r >= e.length && (e = void 0),
                      { value: e && e[r++], done: !e }
                    );
                  },
                };
              throw new TypeError(
                t
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined."
              );
            })(e)),
            (n = {}),
            r("next"),
            r("throw"),
            r("return"),
            (n[Symbol.asyncIterator] = function () {
              return this;
            }),
            n);
        function r(o) {
          n[o] =
            e[o] &&
            function (s) {
              return new Promise(function (a, c) {
                !(function i(o, s, a, c) {
                  Promise.resolve(c).then(function (l) {
                    o({ value: l, done: a });
                  }, s);
                })(a, c, (s = e[o](s)).done, s.value);
              });
            };
        }
      }
      "function" == typeof SuppressedError && SuppressedError;
      const Dp = (e) =>
        e && "number" == typeof e.length && "function" != typeof e;
      function Ep(e) {
        return re(e?.then);
      }
      function Cp(e) {
        return re(e[Dl]);
      }
      function wp(e) {
        return Symbol.asyncIterator && re(e?.[Symbol.asyncIterator]);
      }
      function bp(e) {
        return new TypeError(
          `You provided ${
            null !== e && "object" == typeof e ? "an invalid object" : `'${e}'`
          } where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
        );
      }
      const Mp = (function PM() {
        return "function" == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : "@@iterator";
      })();
      function Ip(e) {
        return re(e?.[Mp]);
      }
      function Sp(e) {
        return (function _p(e, t, n) {
          if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
          var i,
            r = n.apply(e, t || []),
            o = [];
          return (
            (i = {}),
            s("next"),
            s("throw"),
            s("return"),
            (i[Symbol.asyncIterator] = function () {
              return this;
            }),
            i
          );
          function s(f) {
            r[f] &&
              (i[f] = function (h) {
                return new Promise(function (p, g) {
                  o.push([f, h, p, g]) > 1 || a(f, h);
                });
              });
          }
          function a(f, h) {
            try {
              !(function c(f) {
                f.value instanceof kn
                  ? Promise.resolve(f.value.v).then(l, u)
                  : d(o[0][2], f);
              })(r[f](h));
            } catch (p) {
              d(o[0][3], p);
            }
          }
          function l(f) {
            a("next", f);
          }
          function u(f) {
            a("throw", f);
          }
          function d(f, h) {
            f(h), o.shift(), o.length && a(o[0][0], o[0][1]);
          }
        })(this, arguments, function* () {
          const n = e.getReader();
          try {
            for (;;) {
              const { value: r, done: i } = yield kn(n.read());
              if (i) return yield kn(void 0);
              yield yield kn(r);
            }
          } finally {
            n.releaseLock();
          }
        });
      }
      function Tp(e) {
        return re(e?.getReader);
      }
      function lt(e) {
        if (e instanceof ve) return e;
        if (null != e) {
          if (Cp(e))
            return (function FM(e) {
              return new ve((t) => {
                const n = e[Dl]();
                if (re(n.subscribe)) return n.subscribe(t);
                throw new TypeError(
                  "Provided object does not correctly implement Symbol.observable"
                );
              });
            })(e);
          if (Dp(e))
            return (function kM(e) {
              return new ve((t) => {
                for (let n = 0; n < e.length && !t.closed; n++) t.next(e[n]);
                t.complete();
              });
            })(e);
          if (Ep(e))
            return (function LM(e) {
              return new ve((t) => {
                e.then(
                  (n) => {
                    t.closed || (t.next(n), t.complete());
                  },
                  (n) => t.error(n)
                ).then(null, dp);
              });
            })(e);
          if (wp(e)) return Ap(e);
          if (Ip(e))
            return (function jM(e) {
              return new ve((t) => {
                for (const n of e) if ((t.next(n), t.closed)) return;
                t.complete();
              });
            })(e);
          if (Tp(e))
            return (function BM(e) {
              return Ap(Sp(e));
            })(e);
        }
        throw bp(e);
      }
      function Ap(e) {
        return new ve((t) => {
          (function HM(e, t) {
            var n, r, i, o;
            return (function mp(e, t, n, r) {
              return new (n || (n = Promise))(function (o, s) {
                function a(u) {
                  try {
                    l(r.next(u));
                  } catch (d) {
                    s(d);
                  }
                }
                function c(u) {
                  try {
                    l(r.throw(u));
                  } catch (d) {
                    s(d);
                  }
                }
                function l(u) {
                  u.done
                    ? o(u.value)
                    : (function i(o) {
                        return o instanceof n
                          ? o
                          : new n(function (s) {
                              s(o);
                            });
                      })(u.value).then(a, c);
                }
                l((r = r.apply(e, t || [])).next());
              });
            })(this, void 0, void 0, function* () {
              try {
                for (n = vp(e); !(r = yield n.next()).done; )
                  if ((t.next(r.value), t.closed)) return;
              } catch (s) {
                i = { error: s };
              } finally {
                try {
                  r && !r.done && (o = n.return) && (yield o.call(n));
                } finally {
                  if (i) throw i.error;
                }
              }
              t.complete();
            });
          })(e, t).catch((n) => t.error(n));
        });
      }
      function yn(e, t, n, r = 0, i = !1) {
        const o = t.schedule(function () {
          n(), i ? e.add(this.schedule(null, r)) : this.unsubscribe();
        }, r);
        if ((e.add(o), !i)) return o;
      }
      function Ne(e, t, n = 1 / 0) {
        return re(t)
          ? Ne((r, i) => U((o, s) => t(r, o, i, s))(lt(e(r, i))), n)
          : ("number" == typeof t && (n = t),
            be((r, i) =>
              (function VM(e, t, n, r, i, o, s, a) {
                const c = [];
                let l = 0,
                  u = 0,
                  d = !1;
                const f = () => {
                    d && !c.length && !l && t.complete();
                  },
                  h = (g) => (l < r ? p(g) : c.push(g)),
                  p = (g) => {
                    o && t.next(g), l++;
                    let y = !1;
                    lt(n(g, u++)).subscribe(
                      De(
                        t,
                        (v) => {
                          i?.(v), o ? h(v) : t.next(v);
                        },
                        () => {
                          y = !0;
                        },
                        void 0,
                        () => {
                          if (y)
                            try {
                              for (l--; c.length && l < r; ) {
                                const v = c.shift();
                                s ? yn(t, s, () => p(v)) : p(v);
                              }
                              f();
                            } catch (v) {
                              t.error(v);
                            }
                        }
                      )
                    );
                  };
                return (
                  e.subscribe(
                    De(t, h, () => {
                      (d = !0), f();
                    })
                  ),
                  () => {
                    a?.();
                  }
                );
              })(r, i, e, n)
            ));
      }
      function kr(e = 1 / 0) {
        return Ne(Fn, e);
      }
      const Zt = new ve((e) => e.complete());
      function Ml(e) {
        return e[e.length - 1];
      }
      function Op(e) {
        return re(Ml(e)) ? e.pop() : void 0;
      }
      function Ki(e) {
        return (function UM(e) {
          return e && re(e.schedule);
        })(Ml(e))
          ? e.pop()
          : void 0;
      }
      function Np(e, t = 0) {
        return be((n, r) => {
          n.subscribe(
            De(
              r,
              (i) => yn(r, e, () => r.next(i), t),
              () => yn(r, e, () => r.complete(), t),
              (i) => yn(r, e, () => r.error(i), t)
            )
          );
        });
      }
      function Rp(e, t = 0) {
        return be((n, r) => {
          r.add(e.schedule(() => n.subscribe(r), t));
        });
      }
      function xp(e, t) {
        if (!e) throw new Error("Iterable cannot be null");
        return new ve((n) => {
          yn(n, t, () => {
            const r = e[Symbol.asyncIterator]();
            yn(
              n,
              t,
              () => {
                r.next().then((i) => {
                  i.done ? n.complete() : n.next(i.value);
                });
              },
              0,
              !0
            );
          });
        });
      }
      function Re(e, t) {
        return t
          ? (function QM(e, t) {
              if (null != e) {
                if (Cp(e))
                  return (function qM(e, t) {
                    return lt(e).pipe(Rp(t), Np(t));
                  })(e, t);
                if (Dp(e))
                  return (function WM(e, t) {
                    return new ve((n) => {
                      let r = 0;
                      return t.schedule(function () {
                        r === e.length
                          ? n.complete()
                          : (n.next(e[r++]), n.closed || this.schedule());
                      });
                    });
                  })(e, t);
                if (Ep(e))
                  return (function GM(e, t) {
                    return lt(e).pipe(Rp(t), Np(t));
                  })(e, t);
                if (wp(e)) return xp(e, t);
                if (Ip(e))
                  return (function KM(e, t) {
                    return new ve((n) => {
                      let r;
                      return (
                        yn(n, t, () => {
                          (r = e[Mp]()),
                            yn(
                              n,
                              t,
                              () => {
                                let i, o;
                                try {
                                  ({ value: i, done: o } = r.next());
                                } catch (s) {
                                  return void n.error(s);
                                }
                                o ? n.complete() : n.next(i);
                              },
                              0,
                              !0
                            );
                        }),
                        () => re(r?.return) && r.return()
                      );
                    });
                  })(e, t);
                if (Tp(e))
                  return (function ZM(e, t) {
                    return xp(Sp(e), t);
                  })(e, t);
              }
              throw bp(e);
            })(e, t)
          : lt(e);
      }
      class Mt extends bt {
        constructor(t) {
          super(), (this._value = t);
        }
        get value() {
          return this.getValue();
        }
        _subscribe(t) {
          const n = super._subscribe(t);
          return !n.closed && t.next(this._value), n;
        }
        getValue() {
          const { hasError: t, thrownError: n, _value: r } = this;
          if (t) throw n;
          return this._throwIfClosed(), r;
        }
        next(t) {
          super.next((this._value = t));
        }
      }
      function R(...e) {
        return Re(e, Ki(e));
      }
      function Il(e = {}) {
        const {
          connector: t = () => new bt(),
          resetOnError: n = !0,
          resetOnComplete: r = !0,
          resetOnRefCountZero: i = !0,
        } = e;
        return (o) => {
          let s,
            a,
            c,
            l = 0,
            u = !1,
            d = !1;
          const f = () => {
              a?.unsubscribe(), (a = void 0);
            },
            h = () => {
              f(), (s = c = void 0), (u = d = !1);
            },
            p = () => {
              const g = s;
              h(), g?.unsubscribe();
            };
          return be((g, y) => {
            l++, !d && !u && f();
            const v = (c = c ?? t());
            y.add(() => {
              l--, 0 === l && !d && !u && (a = Sl(p, i));
            }),
              v.subscribe(y),
              !s &&
                l > 0 &&
                ((s = new Wi({
                  next: (m) => v.next(m),
                  error: (m) => {
                    (d = !0), f(), (a = Sl(h, n, m)), v.error(m);
                  },
                  complete: () => {
                    (u = !0), f(), (a = Sl(h, r)), v.complete();
                  },
                })),
                lt(g).subscribe(s));
          })(o);
        };
      }
      function Sl(e, t, ...n) {
        if (!0 === t) return void e();
        if (!1 === t) return;
        const r = new Wi({
          next: () => {
            r.unsubscribe(), e();
          },
        });
        return lt(t(...n)).subscribe(r);
      }
      function Qt(e, t) {
        return be((n, r) => {
          let i = null,
            o = 0,
            s = !1;
          const a = () => s && !i && r.complete();
          n.subscribe(
            De(
              r,
              (c) => {
                i?.unsubscribe();
                let l = 0;
                const u = o++;
                lt(e(c, u)).subscribe(
                  (i = De(
                    r,
                    (d) => r.next(t ? t(c, d, u, l++) : d),
                    () => {
                      (i = null), a();
                    }
                  ))
                );
              },
              () => {
                (s = !0), a();
              }
            )
          );
        });
      }
      function JM(e, t) {
        return e === t;
      }
      function ee(e) {
        for (let t in e) if (e[t] === ee) return t;
        throw Error("Could not find renamed property on target object.");
      }
      function Os(e, t) {
        for (const n in t)
          t.hasOwnProperty(n) && !e.hasOwnProperty(n) && (e[n] = t[n]);
      }
      function Ie(e) {
        if ("string" == typeof e) return e;
        if (Array.isArray(e)) return "[" + e.map(Ie).join(", ") + "]";
        if (null == e) return "" + e;
        if (e.overriddenName) return `${e.overriddenName}`;
        if (e.name) return `${e.name}`;
        const t = e.toString();
        if (null == t) return "" + t;
        const n = t.indexOf("\n");
        return -1 === n ? t : t.substring(0, n);
      }
      function Tl(e, t) {
        return null == e || "" === e
          ? null === t
            ? ""
            : t
          : null == t || "" === t
          ? e
          : e + " " + t;
      }
      const eI = ee({ __forward_ref__: ee });
      function Al(e) {
        return (
          (e.__forward_ref__ = Al),
          (e.toString = function () {
            return Ie(this());
          }),
          e
        );
      }
      function k(e) {
        return Ol(e) ? e() : e;
      }
      function Ol(e) {
        return (
          "function" == typeof e &&
          e.hasOwnProperty(eI) &&
          e.__forward_ref__ === Al
        );
      }
      function Nl(e) {
        return e && !!e.ɵproviders;
      }
      const Pp = "https://g.co/ng/security#xss";
      class _ extends Error {
        constructor(t, n) {
          super(
            (function Ns(e, t) {
              return `NG0${Math.abs(e)}${t ? ": " + t : ""}`;
            })(t, n)
          ),
            (this.code = t);
        }
      }
      function L(e) {
        return "string" == typeof e ? e : null == e ? "" : String(e);
      }
      function Rl(e, t) {
        throw new _(-201, !1);
      }
      function It(e, t) {
        null == e &&
          (function P(e, t, n, r) {
            throw new Error(
              `ASSERTION ERROR: ${e}` +
                (null == r ? "" : ` [Expected=> ${n} ${r} ${t} <=Actual]`)
            );
          })(t, e, null, "!=");
      }
      function T(e) {
        return {
          token: e.token,
          providedIn: e.providedIn || null,
          factory: e.factory,
          value: void 0,
        };
      }
      function tt(e) {
        return { providers: e.providers || [], imports: e.imports || [] };
      }
      function Rs(e) {
        return Fp(e, Ps) || Fp(e, kp);
      }
      function Fp(e, t) {
        return e.hasOwnProperty(t) ? e[t] : null;
      }
      function xs(e) {
        return e && (e.hasOwnProperty(xl) || e.hasOwnProperty(cI))
          ? e[xl]
          : null;
      }
      const Ps = ee({ ɵprov: ee }),
        xl = ee({ ɵinj: ee }),
        kp = ee({ ngInjectableDef: ee }),
        cI = ee({ ngInjectorDef: ee });
      var z = (function (e) {
        return (
          (e[(e.Default = 0)] = "Default"),
          (e[(e.Host = 1)] = "Host"),
          (e[(e.Self = 2)] = "Self"),
          (e[(e.SkipSelf = 4)] = "SkipSelf"),
          (e[(e.Optional = 8)] = "Optional"),
          e
        );
      })(z || {});
      let Pl;
      function nt(e) {
        const t = Pl;
        return (Pl = e), t;
      }
      function jp(e, t, n) {
        const r = Rs(e);
        return r && "root" == r.providedIn
          ? void 0 === r.value
            ? (r.value = r.factory())
            : r.value
          : n & z.Optional
          ? null
          : void 0 !== t
          ? t
          : void Rl(Ie(e));
      }
      const ce = globalThis;
      class E {
        constructor(t, n) {
          (this._desc = t),
            (this.ngMetadataName = "InjectionToken"),
            (this.ɵprov = void 0),
            "number" == typeof n
              ? (this.__NG_ELEMENT_ID__ = n)
              : void 0 !== n &&
                (this.ɵprov = T({
                  token: this,
                  providedIn: n.providedIn || "root",
                  factory: n.factory,
                }));
        }
        get multi() {
          return this;
        }
        toString() {
          return `InjectionToken ${this._desc}`;
        }
      }
      const Zi = {},
        Bl = "__NG_DI_FLAG__",
        Fs = "ngTempTokenPath",
        dI = /\n/gm,
        Hp = "__source";
      let Lr;
      function Ln(e) {
        const t = Lr;
        return (Lr = e), t;
      }
      function pI(e, t = z.Default) {
        if (void 0 === Lr) throw new _(-203, !1);
        return null === Lr
          ? jp(e, void 0, t)
          : Lr.get(e, t & z.Optional ? null : void 0, t);
      }
      function C(e, t = z.Default) {
        return (
          (function Lp() {
            return Pl;
          })() || pI
        )(k(e), t);
      }
      function M(e, t = z.Default) {
        return C(e, ks(t));
      }
      function ks(e) {
        return typeof e > "u" || "number" == typeof e
          ? e
          : 0 |
              (e.optional && 8) |
              (e.host && 1) |
              (e.self && 2) |
              (e.skipSelf && 4);
      }
      function Hl(e) {
        const t = [];
        for (let n = 0; n < e.length; n++) {
          const r = k(e[n]);
          if (Array.isArray(r)) {
            if (0 === r.length) throw new _(900, !1);
            let i,
              o = z.Default;
            for (let s = 0; s < r.length; s++) {
              const a = r[s],
                c = gI(a);
              "number" == typeof c
                ? -1 === c
                  ? (i = a.token)
                  : (o |= c)
                : (i = a);
            }
            t.push(C(i, o));
          } else t.push(C(r));
        }
        return t;
      }
      function Qi(e, t) {
        return (e[Bl] = t), (e.prototype[Bl] = t), e;
      }
      function gI(e) {
        return e[Bl];
      }
      function _n(e) {
        return { toString: e }.toString();
      }
      var Ls = (function (e) {
          return (
            (e[(e.OnPush = 0)] = "OnPush"), (e[(e.Default = 1)] = "Default"), e
          );
        })(Ls || {}),
        St = (function (e) {
          return (
            (e[(e.Emulated = 0)] = "Emulated"),
            (e[(e.None = 2)] = "None"),
            (e[(e.ShadowDom = 3)] = "ShadowDom"),
            e
          );
        })(St || {});
      const Yt = {},
        Q = [],
        js = ee({ ɵcmp: ee }),
        Vl = ee({ ɵdir: ee }),
        $l = ee({ ɵpipe: ee }),
        $p = ee({ ɵmod: ee }),
        vn = ee({ ɵfac: ee }),
        Yi = ee({ __NG_ELEMENT_ID__: ee }),
        Up = ee({ __NG_ENV_ID__: ee });
      function zp(e, t, n) {
        let r = e.length;
        for (;;) {
          const i = e.indexOf(t, n);
          if (-1 === i) return i;
          if (0 === i || e.charCodeAt(i - 1) <= 32) {
            const o = t.length;
            if (i + o === r || e.charCodeAt(i + o) <= 32) return i;
          }
          n = i + 1;
        }
      }
      function Ul(e, t, n) {
        let r = 0;
        for (; r < n.length; ) {
          const i = n[r];
          if ("number" == typeof i) {
            if (0 !== i) break;
            r++;
            const o = n[r++],
              s = n[r++],
              a = n[r++];
            e.setAttribute(t, s, a, o);
          } else {
            const o = i,
              s = n[++r];
            Gp(o) ? e.setProperty(t, o, s) : e.setAttribute(t, o, s), r++;
          }
        }
        return r;
      }
      function qp(e) {
        return 3 === e || 4 === e || 6 === e;
      }
      function Gp(e) {
        return 64 === e.charCodeAt(0);
      }
      function Xi(e, t) {
        if (null !== t && 0 !== t.length)
          if (null === e || 0 === e.length) e = t.slice();
          else {
            let n = -1;
            for (let r = 0; r < t.length; r++) {
              const i = t[r];
              "number" == typeof i
                ? (n = i)
                : 0 === n ||
                  Wp(e, n, i, null, -1 === n || 2 === n ? t[++r] : null);
            }
          }
        return e;
      }
      function Wp(e, t, n, r, i) {
        let o = 0,
          s = e.length;
        if (-1 === t) s = -1;
        else
          for (; o < e.length; ) {
            const a = e[o++];
            if ("number" == typeof a) {
              if (a === t) {
                s = -1;
                break;
              }
              if (a > t) {
                s = o - 1;
                break;
              }
            }
          }
        for (; o < e.length; ) {
          const a = e[o];
          if ("number" == typeof a) break;
          if (a === n) {
            if (null === r) return void (null !== i && (e[o + 1] = i));
            if (r === e[o + 1]) return void (e[o + 2] = i);
          }
          o++, null !== r && o++, null !== i && o++;
        }
        -1 !== s && (e.splice(s, 0, t), (o = s + 1)),
          e.splice(o++, 0, n),
          null !== r && e.splice(o++, 0, r),
          null !== i && e.splice(o++, 0, i);
      }
      const Kp = "ng-template";
      function _I(e, t, n) {
        let r = 0,
          i = !0;
        for (; r < e.length; ) {
          let o = e[r++];
          if ("string" == typeof o && i) {
            const s = e[r++];
            if (n && "class" === o && -1 !== zp(s.toLowerCase(), t, 0))
              return !0;
          } else {
            if (1 === o) {
              for (; r < e.length && "string" == typeof (o = e[r++]); )
                if (o.toLowerCase() === t) return !0;
              return !1;
            }
            "number" == typeof o && (i = !1);
          }
        }
        return !1;
      }
      function Zp(e) {
        return 4 === e.type && e.value !== Kp;
      }
      function vI(e, t, n) {
        return t === (4 !== e.type || n ? e.value : Kp);
      }
      function DI(e, t, n) {
        let r = 4;
        const i = e.attrs || [],
          o = (function wI(e) {
            for (let t = 0; t < e.length; t++) if (qp(e[t])) return t;
            return e.length;
          })(i);
        let s = !1;
        for (let a = 0; a < t.length; a++) {
          const c = t[a];
          if ("number" != typeof c) {
            if (!s)
              if (4 & r) {
                if (
                  ((r = 2 | (1 & r)),
                  ("" !== c && !vI(e, c, n)) || ("" === c && 1 === t.length))
                ) {
                  if (jt(r)) return !1;
                  s = !0;
                }
              } else {
                const l = 8 & r ? c : t[++a];
                if (8 & r && null !== e.attrs) {
                  if (!_I(e.attrs, l, n)) {
                    if (jt(r)) return !1;
                    s = !0;
                  }
                  continue;
                }
                const d = EI(8 & r ? "class" : c, i, Zp(e), n);
                if (-1 === d) {
                  if (jt(r)) return !1;
                  s = !0;
                  continue;
                }
                if ("" !== l) {
                  let f;
                  f = d > o ? "" : i[d + 1].toLowerCase();
                  const h = 8 & r ? f : null;
                  if ((h && -1 !== zp(h, l, 0)) || (2 & r && l !== f)) {
                    if (jt(r)) return !1;
                    s = !0;
                  }
                }
              }
          } else {
            if (!s && !jt(r) && !jt(c)) return !1;
            if (s && jt(c)) continue;
            (s = !1), (r = c | (1 & r));
          }
        }
        return jt(r) || s;
      }
      function jt(e) {
        return 0 == (1 & e);
      }
      function EI(e, t, n, r) {
        if (null === t) return -1;
        let i = 0;
        if (r || !n) {
          let o = !1;
          for (; i < t.length; ) {
            const s = t[i];
            if (s === e) return i;
            if (3 === s || 6 === s) o = !0;
            else {
              if (1 === s || 2 === s) {
                let a = t[++i];
                for (; "string" == typeof a; ) a = t[++i];
                continue;
              }
              if (4 === s) break;
              if (0 === s) {
                i += 4;
                continue;
              }
            }
            i += o ? 1 : 2;
          }
          return -1;
        }
        return (function bI(e, t) {
          let n = e.indexOf(4);
          if (n > -1)
            for (n++; n < e.length; ) {
              const r = e[n];
              if ("number" == typeof r) return -1;
              if (r === t) return n;
              n++;
            }
          return -1;
        })(t, e);
      }
      function Qp(e, t, n = !1) {
        for (let r = 0; r < t.length; r++) if (DI(e, t[r], n)) return !0;
        return !1;
      }
      function MI(e, t) {
        e: for (let n = 0; n < t.length; n++) {
          const r = t[n];
          if (e.length === r.length) {
            for (let i = 0; i < e.length; i++) if (e[i] !== r[i]) continue e;
            return !0;
          }
        }
        return !1;
      }
      function Yp(e, t) {
        return e ? ":not(" + t.trim() + ")" : t;
      }
      function II(e) {
        let t = e[0],
          n = 1,
          r = 2,
          i = "",
          o = !1;
        for (; n < e.length; ) {
          let s = e[n];
          if ("string" == typeof s)
            if (2 & r) {
              const a = e[++n];
              i += "[" + s + (a.length > 0 ? '="' + a + '"' : "") + "]";
            } else 8 & r ? (i += "." + s) : 4 & r && (i += " " + s);
          else
            "" !== i && !jt(s) && ((t += Yp(o, i)), (i = "")),
              (r = s),
              (o = o || !jt(r));
          n++;
        }
        return "" !== i && (t += Yp(o, i)), t;
      }
      function or(e) {
        return _n(() => {
          const t = Jp(e),
            n = {
              ...t,
              decls: e.decls,
              vars: e.vars,
              template: e.template,
              consts: e.consts || null,
              ngContentSelectors: e.ngContentSelectors,
              onPush: e.changeDetection === Ls.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              dependencies: (t.standalone && e.dependencies) || null,
              getStandaloneInjector: null,
              signals: e.signals ?? !1,
              data: e.data || {},
              encapsulation: e.encapsulation || St.Emulated,
              styles: e.styles || Q,
              _: null,
              schemas: e.schemas || null,
              tView: null,
              id: "",
            };
          eg(n);
          const r = e.dependencies;
          return (
            (n.directiveDefs = Bs(r, !1)),
            (n.pipeDefs = Bs(r, !0)),
            (n.id = (function PI(e) {
              let t = 0;
              const n = [
                e.selectors,
                e.ngContentSelectors,
                e.hostVars,
                e.hostAttrs,
                e.consts,
                e.vars,
                e.decls,
                e.encapsulation,
                e.standalone,
                e.signals,
                e.exportAs,
                JSON.stringify(e.inputs),
                JSON.stringify(e.outputs),
                Object.getOwnPropertyNames(e.type.prototype),
                !!e.contentQueries,
                !!e.viewQuery,
              ].join("|");
              for (const i of n) t = (Math.imul(31, t) + i.charCodeAt(0)) << 0;
              return (t += 2147483648), "c" + t;
            })(n)),
            n
          );
        });
      }
      function OI(e) {
        return G(e) || xe(e);
      }
      function NI(e) {
        return null !== e;
      }
      function dt(e) {
        return _n(() => ({
          type: e.type,
          bootstrap: e.bootstrap || Q,
          declarations: e.declarations || Q,
          imports: e.imports || Q,
          exports: e.exports || Q,
          transitiveCompileScopes: null,
          schemas: e.schemas || null,
          id: e.id || null,
        }));
      }
      function Xp(e, t) {
        if (null == e) return Yt;
        const n = {};
        for (const r in e)
          if (e.hasOwnProperty(r)) {
            let i = e[r],
              o = i;
            Array.isArray(i) && ((o = i[1]), (i = i[0])),
              (n[i] = r),
              t && (t[i] = o);
          }
        return n;
      }
      function ze(e) {
        return _n(() => {
          const t = Jp(e);
          return eg(t), t;
        });
      }
      function G(e) {
        return e[js] || null;
      }
      function xe(e) {
        return e[Vl] || null;
      }
      function qe(e) {
        return e[$l] || null;
      }
      function ft(e, t) {
        const n = e[$p] || null;
        if (!n && !0 === t)
          throw new Error(`Type ${Ie(e)} does not have '\u0275mod' property.`);
        return n;
      }
      function Jp(e) {
        const t = {};
        return {
          type: e.type,
          providersResolver: null,
          factory: null,
          hostBindings: e.hostBindings || null,
          hostVars: e.hostVars || 0,
          hostAttrs: e.hostAttrs || null,
          contentQueries: e.contentQueries || null,
          declaredInputs: t,
          inputTransforms: null,
          inputConfig: e.inputs || Yt,
          exportAs: e.exportAs || null,
          standalone: !0 === e.standalone,
          signals: !0 === e.signals,
          selectors: e.selectors || Q,
          viewQuery: e.viewQuery || null,
          features: e.features || null,
          setInput: null,
          findHostDirectiveDefs: null,
          hostDirectives: null,
          inputs: Xp(e.inputs, t),
          outputs: Xp(e.outputs),
        };
      }
      function eg(e) {
        e.features?.forEach((t) => t(e));
      }
      function Bs(e, t) {
        if (!e) return null;
        const n = t ? qe : OI;
        return () =>
          ("function" == typeof e ? e() : e).map((r) => n(r)).filter(NI);
      }
      const me = 0,
        w = 1,
        V = 2,
        he = 3,
        Bt = 4,
        Ji = 5,
        Be = 6,
        Br = 7,
        Ee = 8,
        jn = 9,
        Hr = 10,
        j = 11,
        eo = 12,
        tg = 13,
        Vr = 14,
        Ce = 15,
        to = 16,
        $r = 17,
        Xt = 18,
        no = 19,
        ng = 20,
        Bn = 21,
        Dn = 22,
        ro = 23,
        io = 24,
        q = 25,
        zl = 1,
        rg = 2,
        Jt = 7,
        Ur = 9,
        Pe = 11;
      function it(e) {
        return Array.isArray(e) && "object" == typeof e[zl];
      }
      function Ge(e) {
        return Array.isArray(e) && !0 === e[zl];
      }
      function ql(e) {
        return 0 != (4 & e.flags);
      }
      function sr(e) {
        return e.componentOffset > -1;
      }
      function Vs(e) {
        return 1 == (1 & e.flags);
      }
      function Ht(e) {
        return !!e.template;
      }
      function Gl(e) {
        return 0 != (512 & e[V]);
      }
      function ar(e, t) {
        return e.hasOwnProperty(vn) ? e[vn] : null;
      }
      let Fe = null,
        $s = !1;
      function Tt(e) {
        const t = Fe;
        return (Fe = e), t;
      }
      const sg = {
        version: 0,
        dirty: !1,
        producerNode: void 0,
        producerLastReadVersion: void 0,
        producerIndexOfThis: void 0,
        nextProducerIndex: 0,
        liveConsumerNode: void 0,
        liveConsumerIndexOfThis: void 0,
        consumerAllowSignalWrites: !1,
        consumerIsAlwaysLive: !1,
        producerMustRecompute: () => !1,
        producerRecomputeValue: () => {},
        consumerMarkedDirty: () => {},
      };
      function cg(e) {
        if (!so(e) || e.dirty) {
          if (!e.producerMustRecompute(e) && !dg(e)) return void (e.dirty = !1);
          e.producerRecomputeValue(e), (e.dirty = !1);
        }
      }
      function ug(e) {
        (e.dirty = !0),
          (function lg(e) {
            if (void 0 === e.liveConsumerNode) return;
            const t = $s;
            $s = !0;
            try {
              for (const n of e.liveConsumerNode) n.dirty || ug(n);
            } finally {
              $s = t;
            }
          })(e),
          e.consumerMarkedDirty?.(e);
      }
      function Kl(e) {
        return e && (e.nextProducerIndex = 0), Tt(e);
      }
      function Zl(e, t) {
        if (
          (Tt(t),
          e &&
            void 0 !== e.producerNode &&
            void 0 !== e.producerIndexOfThis &&
            void 0 !== e.producerLastReadVersion)
        ) {
          if (so(e))
            for (let n = e.nextProducerIndex; n < e.producerNode.length; n++)
              Us(e.producerNode[n], e.producerIndexOfThis[n]);
          for (; e.producerNode.length > e.nextProducerIndex; )
            e.producerNode.pop(),
              e.producerLastReadVersion.pop(),
              e.producerIndexOfThis.pop();
        }
      }
      function dg(e) {
        zr(e);
        for (let t = 0; t < e.producerNode.length; t++) {
          const n = e.producerNode[t],
            r = e.producerLastReadVersion[t];
          if (r !== n.version || (cg(n), r !== n.version)) return !0;
        }
        return !1;
      }
      function fg(e) {
        if ((zr(e), so(e)))
          for (let t = 0; t < e.producerNode.length; t++)
            Us(e.producerNode[t], e.producerIndexOfThis[t]);
        (e.producerNode.length =
          e.producerLastReadVersion.length =
          e.producerIndexOfThis.length =
            0),
          e.liveConsumerNode &&
            (e.liveConsumerNode.length = e.liveConsumerIndexOfThis.length = 0);
      }
      function Us(e, t) {
        if (
          ((function pg(e) {
            (e.liveConsumerNode ??= []), (e.liveConsumerIndexOfThis ??= []);
          })(e),
          zr(e),
          1 === e.liveConsumerNode.length)
        )
          for (let r = 0; r < e.producerNode.length; r++)
            Us(e.producerNode[r], e.producerIndexOfThis[r]);
        const n = e.liveConsumerNode.length - 1;
        if (
          ((e.liveConsumerNode[t] = e.liveConsumerNode[n]),
          (e.liveConsumerIndexOfThis[t] = e.liveConsumerIndexOfThis[n]),
          e.liveConsumerNode.length--,
          e.liveConsumerIndexOfThis.length--,
          t < e.liveConsumerNode.length)
        ) {
          const r = e.liveConsumerIndexOfThis[t],
            i = e.liveConsumerNode[t];
          zr(i), (i.producerIndexOfThis[r] = t);
        }
      }
      function so(e) {
        return e.consumerIsAlwaysLive || (e?.liveConsumerNode?.length ?? 0) > 0;
      }
      function zr(e) {
        (e.producerNode ??= []),
          (e.producerIndexOfThis ??= []),
          (e.producerLastReadVersion ??= []);
      }
      let gg = null;
      const vg = () => {},
        WI = (() => ({
          ...sg,
          consumerIsAlwaysLive: !0,
          consumerAllowSignalWrites: !1,
          consumerMarkedDirty: (e) => {
            e.schedule(e.ref);
          },
          hasRun: !1,
          cleanupFn: vg,
        }))();
      class KI {
        constructor(t, n, r) {
          (this.previousValue = t),
            (this.currentValue = n),
            (this.firstChange = r);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      function cr() {
        return Dg;
      }
      function Dg(e) {
        return e.type.prototype.ngOnChanges && (e.setInput = QI), ZI;
      }
      function ZI() {
        const e = Cg(this),
          t = e?.current;
        if (t) {
          const n = e.previous;
          if (n === Yt) e.previous = t;
          else for (let r in t) n[r] = t[r];
          (e.current = null), this.ngOnChanges(t);
        }
      }
      function QI(e, t, n, r) {
        const i = this.declaredInputs[n],
          o =
            Cg(e) ||
            (function YI(e, t) {
              return (e[Eg] = t);
            })(e, { previous: Yt, current: null }),
          s = o.current || (o.current = {}),
          a = o.previous,
          c = a[i];
        (s[i] = new KI(c && c.currentValue, t, a === Yt)), (e[r] = t);
      }
      cr.ngInherit = !0;
      const Eg = "__ngSimpleChanges__";
      function Cg(e) {
        return e[Eg] || null;
      }
      const en = function (e, t, n) {};
      function le(e) {
        for (; Array.isArray(e); ) e = e[me];
        return e;
      }
      function zs(e, t) {
        return le(t[e]);
      }
      function ot(e, t) {
        return le(t[e.index]);
      }
      function Mg(e, t) {
        return e.data[t];
      }
      function ht(e, t) {
        const n = t[e];
        return it(n) ? n : n[me];
      }
      function Vn(e, t) {
        return null == t ? null : e[t];
      }
      function Ig(e) {
        e[$r] = 0;
      }
      function rS(e) {
        1024 & e[V] || ((e[V] |= 1024), Tg(e, 1));
      }
      function Sg(e) {
        1024 & e[V] && ((e[V] &= -1025), Tg(e, -1));
      }
      function Tg(e, t) {
        let n = e[he];
        if (null === n) return;
        n[Ji] += t;
        let r = n;
        for (
          n = n[he];
          null !== n && ((1 === t && 1 === r[Ji]) || (-1 === t && 0 === r[Ji]));

        )
          (n[Ji] += t), (r = n), (n = n[he]);
      }
      const F = {
        lFrame: Bg(null),
        bindingsEnabled: !0,
        skipHydrationRootTNode: null,
      };
      function Ng() {
        return F.bindingsEnabled;
      }
      function Gr() {
        return null !== F.skipHydrationRootTNode;
      }
      function D() {
        return F.lFrame.lView;
      }
      function W() {
        return F.lFrame.tView;
      }
      function ke() {
        let e = Rg();
        for (; null !== e && 64 === e.type; ) e = e.parent;
        return e;
      }
      function Rg() {
        return F.lFrame.currentTNode;
      }
      function tn(e, t) {
        const n = F.lFrame;
        (n.currentTNode = e), (n.isParent = t);
      }
      function eu() {
        return F.lFrame.isParent;
      }
      function tu() {
        F.lFrame.isParent = !1;
      }
      function Wr() {
        return F.lFrame.bindingIndex++;
      }
      function yS(e, t) {
        const n = F.lFrame;
        (n.bindingIndex = n.bindingRootIndex = e), nu(t);
      }
      function nu(e) {
        F.lFrame.currentDirectiveIndex = e;
      }
      function kg() {
        return F.lFrame.currentQueryIndex;
      }
      function iu(e) {
        F.lFrame.currentQueryIndex = e;
      }
      function vS(e) {
        const t = e[w];
        return 2 === t.type ? t.declTNode : 1 === t.type ? e[Be] : null;
      }
      function Lg(e, t, n) {
        if (n & z.SkipSelf) {
          let i = t,
            o = e;
          for (
            ;
            !((i = i.parent),
            null !== i ||
              n & z.Host ||
              ((i = vS(o)), null === i || ((o = o[Vr]), 10 & i.type)));

          );
          if (null === i) return !1;
          (t = i), (e = o);
        }
        const r = (F.lFrame = jg());
        return (r.currentTNode = t), (r.lView = e), !0;
      }
      function ou(e) {
        const t = jg(),
          n = e[w];
        (F.lFrame = t),
          (t.currentTNode = n.firstChild),
          (t.lView = e),
          (t.tView = n),
          (t.contextLView = e),
          (t.bindingIndex = n.bindingStartIndex),
          (t.inI18n = !1);
      }
      function jg() {
        const e = F.lFrame,
          t = null === e ? null : e.child;
        return null === t ? Bg(e) : t;
      }
      function Bg(e) {
        const t = {
          currentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: -1,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: e,
          child: null,
          inI18n: !1,
        };
        return null !== e && (e.child = t), t;
      }
      function Hg() {
        const e = F.lFrame;
        return (
          (F.lFrame = e.parent), (e.currentTNode = null), (e.lView = null), e
        );
      }
      const Vg = Hg;
      function su() {
        const e = Hg();
        (e.isParent = !0),
          (e.tView = null),
          (e.selectedIndex = -1),
          (e.contextLView = null),
          (e.elementDepthCount = 0),
          (e.currentDirectiveIndex = -1),
          (e.currentNamespace = null),
          (e.bindingRootIndex = -1),
          (e.bindingIndex = -1),
          (e.currentQueryIndex = 0);
      }
      function Ke() {
        return F.lFrame.selectedIndex;
      }
      function lr(e) {
        F.lFrame.selectedIndex = e;
      }
      function pe() {
        const e = F.lFrame;
        return Mg(e.tView, e.selectedIndex);
      }
      let Ug = !0;
      function qs() {
        return Ug;
      }
      function $n(e) {
        Ug = e;
      }
      function Gs(e, t) {
        for (let n = t.directiveStart, r = t.directiveEnd; n < r; n++) {
          const o = e.data[n].type.prototype,
            {
              ngAfterContentInit: s,
              ngAfterContentChecked: a,
              ngAfterViewInit: c,
              ngAfterViewChecked: l,
              ngOnDestroy: u,
            } = o;
          s && (e.contentHooks ??= []).push(-n, s),
            a &&
              ((e.contentHooks ??= []).push(n, a),
              (e.contentCheckHooks ??= []).push(n, a)),
            c && (e.viewHooks ??= []).push(-n, c),
            l &&
              ((e.viewHooks ??= []).push(n, l),
              (e.viewCheckHooks ??= []).push(n, l)),
            null != u && (e.destroyHooks ??= []).push(n, u);
        }
      }
      function Ws(e, t, n) {
        zg(e, t, 3, n);
      }
      function Ks(e, t, n, r) {
        (3 & e[V]) === n && zg(e, t, n, r);
      }
      function au(e, t) {
        let n = e[V];
        (3 & n) === t && ((n &= 8191), (n += 1), (e[V] = n));
      }
      function zg(e, t, n, r) {
        const o = r ?? -1,
          s = t.length - 1;
        let a = 0;
        for (let c = void 0 !== r ? 65535 & e[$r] : 0; c < s; c++)
          if ("number" == typeof t[c + 1]) {
            if (((a = t[c]), null != r && a >= r)) break;
          } else
            t[c] < 0 && (e[$r] += 65536),
              (a < o || -1 == o) &&
                (SS(e, n, t, c), (e[$r] = (4294901760 & e[$r]) + c + 2)),
              c++;
      }
      function qg(e, t) {
        en(4, e, t);
        const n = Tt(null);
        try {
          t.call(e);
        } finally {
          Tt(n), en(5, e, t);
        }
      }
      function SS(e, t, n, r) {
        const i = n[r] < 0,
          o = n[r + 1],
          a = e[i ? -n[r] : n[r]];
        i
          ? e[V] >> 13 < e[$r] >> 16 &&
            (3 & e[V]) === t &&
            ((e[V] += 8192), qg(a, o))
          : qg(a, o);
      }
      const Kr = -1;
      class co {
        constructor(t, n, r) {
          (this.factory = t),
            (this.resolving = !1),
            (this.canSeeViewProviders = n),
            (this.injectImpl = r);
        }
      }
      function lu(e) {
        return e !== Kr;
      }
      function lo(e) {
        return 32767 & e;
      }
      function uo(e, t) {
        let n = (function NS(e) {
            return e >> 16;
          })(e),
          r = t;
        for (; n > 0; ) (r = r[Vr]), n--;
        return r;
      }
      let uu = !0;
      function Zs(e) {
        const t = uu;
        return (uu = e), t;
      }
      const Gg = 255,
        Wg = 5;
      let RS = 0;
      const nn = {};
      function Qs(e, t) {
        const n = Kg(e, t);
        if (-1 !== n) return n;
        const r = t[w];
        r.firstCreatePass &&
          ((e.injectorIndex = t.length),
          du(r.data, e),
          du(t, null),
          du(r.blueprint, null));
        const i = Ys(e, t),
          o = e.injectorIndex;
        if (lu(i)) {
          const s = lo(i),
            a = uo(i, t),
            c = a[w].data;
          for (let l = 0; l < 8; l++) t[o + l] = a[s + l] | c[s + l];
        }
        return (t[o + 8] = i), o;
      }
      function du(e, t) {
        e.push(0, 0, 0, 0, 0, 0, 0, 0, t);
      }
      function Kg(e, t) {
        return -1 === e.injectorIndex ||
          (e.parent && e.parent.injectorIndex === e.injectorIndex) ||
          null === t[e.injectorIndex + 8]
          ? -1
          : e.injectorIndex;
      }
      function Ys(e, t) {
        if (e.parent && -1 !== e.parent.injectorIndex)
          return e.parent.injectorIndex;
        let n = 0,
          r = null,
          i = t;
        for (; null !== i; ) {
          if (((r = nm(i)), null === r)) return Kr;
          if ((n++, (i = i[Vr]), -1 !== r.injectorIndex))
            return r.injectorIndex | (n << 16);
        }
        return Kr;
      }
      function fu(e, t, n) {
        !(function xS(e, t, n) {
          let r;
          "string" == typeof n
            ? (r = n.charCodeAt(0) || 0)
            : n.hasOwnProperty(Yi) && (r = n[Yi]),
            null == r && (r = n[Yi] = RS++);
          const i = r & Gg;
          t.data[e + (i >> Wg)] |= 1 << i;
        })(e, t, n);
      }
      function Zg(e, t, n) {
        if (n & z.Optional || void 0 !== e) return e;
        Rl();
      }
      function Qg(e, t, n, r) {
        if (
          (n & z.Optional && void 0 === r && (r = null),
          !(n & (z.Self | z.Host)))
        ) {
          const i = e[jn],
            o = nt(void 0);
          try {
            return i ? i.get(t, r, n & z.Optional) : jp(t, r, n & z.Optional);
          } finally {
            nt(o);
          }
        }
        return Zg(r, 0, n);
      }
      function Yg(e, t, n, r = z.Default, i) {
        if (null !== e) {
          if (2048 & t[V] && !(r & z.Self)) {
            const s = (function BS(e, t, n, r, i) {
              let o = e,
                s = t;
              for (
                ;
                null !== o && null !== s && 2048 & s[V] && !(512 & s[V]);

              ) {
                const a = Xg(o, s, n, r | z.Self, nn);
                if (a !== nn) return a;
                let c = o.parent;
                if (!c) {
                  const l = s[ng];
                  if (l) {
                    const u = l.get(n, nn, r);
                    if (u !== nn) return u;
                  }
                  (c = nm(s)), (s = s[Vr]);
                }
                o = c;
              }
              return i;
            })(e, t, n, r, nn);
            if (s !== nn) return s;
          }
          const o = Xg(e, t, n, r, nn);
          if (o !== nn) return o;
        }
        return Qg(t, n, r, i);
      }
      function Xg(e, t, n, r, i) {
        const o = (function kS(e) {
          if ("string" == typeof e) return e.charCodeAt(0) || 0;
          const t = e.hasOwnProperty(Yi) ? e[Yi] : void 0;
          return "number" == typeof t ? (t >= 0 ? t & Gg : jS) : t;
        })(n);
        if ("function" == typeof o) {
          if (!Lg(t, e, r)) return r & z.Host ? Zg(i, 0, r) : Qg(t, n, r, i);
          try {
            let s;
            if (((s = o(r)), null != s || r & z.Optional)) return s;
            Rl();
          } finally {
            Vg();
          }
        } else if ("number" == typeof o) {
          let s = null,
            a = Kg(e, t),
            c = Kr,
            l = r & z.Host ? t[Ce][Be] : null;
          for (
            (-1 === a || r & z.SkipSelf) &&
            ((c = -1 === a ? Ys(e, t) : t[a + 8]),
            c !== Kr && em(r, !1)
              ? ((s = t[w]), (a = lo(c)), (t = uo(c, t)))
              : (a = -1));
            -1 !== a;

          ) {
            const u = t[w];
            if (Jg(o, a, u.data)) {
              const d = FS(a, t, n, s, r, l);
              if (d !== nn) return d;
            }
            (c = t[a + 8]),
              c !== Kr && em(r, t[w].data[a + 8] === l) && Jg(o, a, t)
                ? ((s = u), (a = lo(c)), (t = uo(c, t)))
                : (a = -1);
          }
        }
        return i;
      }
      function FS(e, t, n, r, i, o) {
        const s = t[w],
          a = s.data[e + 8],
          u = Xs(
            a,
            s,
            n,
            null == r ? sr(a) && uu : r != s && 0 != (3 & a.type),
            i & z.Host && o === a
          );
        return null !== u ? ur(t, s, u, a) : nn;
      }
      function Xs(e, t, n, r, i) {
        const o = e.providerIndexes,
          s = t.data,
          a = 1048575 & o,
          c = e.directiveStart,
          u = o >> 20,
          f = i ? a + u : e.directiveEnd;
        for (let h = r ? a : a + u; h < f; h++) {
          const p = s[h];
          if ((h < c && n === p) || (h >= c && p.type === n)) return h;
        }
        if (i) {
          const h = s[c];
          if (h && Ht(h) && h.type === n) return c;
        }
        return null;
      }
      function ur(e, t, n, r) {
        let i = e[n];
        const o = t.data;
        if (
          (function TS(e) {
            return e instanceof co;
          })(i)
        ) {
          const s = i;
          s.resolving &&
            (function tI(e, t) {
              const n = t ? `. Dependency path: ${t.join(" > ")} > ${e}` : "";
              throw new _(
                -200,
                `Circular dependency in DI detected for ${e}${n}`
              );
            })(
              (function J(e) {
                return "function" == typeof e
                  ? e.name || e.toString()
                  : "object" == typeof e &&
                    null != e &&
                    "function" == typeof e.type
                  ? e.type.name || e.type.toString()
                  : L(e);
              })(o[n])
            );
          const a = Zs(s.canSeeViewProviders);
          s.resolving = !0;
          const l = s.injectImpl ? nt(s.injectImpl) : null;
          Lg(e, r, z.Default);
          try {
            (i = e[n] = s.factory(void 0, o, e, r)),
              t.firstCreatePass &&
                n >= r.directiveStart &&
                (function IS(e, t, n) {
                  const {
                    ngOnChanges: r,
                    ngOnInit: i,
                    ngDoCheck: o,
                  } = t.type.prototype;
                  if (r) {
                    const s = Dg(t);
                    (n.preOrderHooks ??= []).push(e, s),
                      (n.preOrderCheckHooks ??= []).push(e, s);
                  }
                  i && (n.preOrderHooks ??= []).push(0 - e, i),
                    o &&
                      ((n.preOrderHooks ??= []).push(e, o),
                      (n.preOrderCheckHooks ??= []).push(e, o));
                })(n, o[n], t);
          } finally {
            null !== l && nt(l), Zs(a), (s.resolving = !1), Vg();
          }
        }
        return i;
      }
      function Jg(e, t, n) {
        return !!(n[t + (e >> Wg)] & (1 << e));
      }
      function em(e, t) {
        return !(e & z.Self || (e & z.Host && t));
      }
      class Ze {
        constructor(t, n) {
          (this._tNode = t), (this._lView = n);
        }
        get(t, n, r) {
          return Yg(this._tNode, this._lView, t, ks(r), n);
        }
      }
      function jS() {
        return new Ze(ke(), D());
      }
      function hu(e) {
        return Ol(e)
          ? () => {
              const t = hu(k(e));
              return t && t();
            }
          : ar(e);
      }
      function nm(e) {
        const t = e[w],
          n = t.type;
        return 2 === n ? t.declTNode : 1 === n ? e[Be] : null;
      }
      function ho(e) {
        return (function PS(e, t) {
          if ("class" === t) return e.classes;
          if ("style" === t) return e.styles;
          const n = e.attrs;
          if (n) {
            const r = n.length;
            let i = 0;
            for (; i < r; ) {
              const o = n[i];
              if (qp(o)) break;
              if (0 === o) i += 2;
              else if ("number" == typeof o)
                for (i++; i < r && "string" == typeof n[i]; ) i++;
              else {
                if (o === t) return n[i + 1];
                i += 2;
              }
            }
          }
          return null;
        })(ke(), e);
      }
      const Qr = "__parameters__";
      function Xr(e, t, n) {
        return _n(() => {
          const r = (function pu(e) {
            return function (...n) {
              if (e) {
                const r = e(...n);
                for (const i in r) this[i] = r[i];
              }
            };
          })(t);
          function i(...o) {
            if (this instanceof i) return r.apply(this, o), this;
            const s = new i(...o);
            return (a.annotation = s), a;
            function a(c, l, u) {
              const d = c.hasOwnProperty(Qr)
                ? c[Qr]
                : Object.defineProperty(c, Qr, { value: [] })[Qr];
              for (; d.length <= u; ) d.push(null);
              return (d[u] = d[u] || []).push(s), c;
            }
          }
          return (
            n && (i.prototype = Object.create(n.prototype)),
            (i.prototype.ngMetadataName = e),
            (i.annotationCls = i),
            i
          );
        });
      }
      function ei(e, t) {
        e.forEach((n) => (Array.isArray(n) ? ei(n, t) : t(n)));
      }
      function im(e, t, n) {
        t >= e.length ? e.push(n) : e.splice(t, 0, n);
      }
      function Js(e, t) {
        return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0];
      }
      function go(e, t) {
        const n = [];
        for (let r = 0; r < e; r++) n.push(t);
        return n;
      }
      function pt(e, t, n) {
        let r = ti(e, t);
        return (
          r >= 0
            ? (e[1 | r] = n)
            : ((r = ~r),
              (function GS(e, t, n, r) {
                let i = e.length;
                if (i == t) e.push(n, r);
                else if (1 === i) e.push(r, e[0]), (e[0] = n);
                else {
                  for (i--, e.push(e[i - 1], e[i]); i > t; )
                    (e[i] = e[i - 2]), i--;
                  (e[t] = n), (e[t + 1] = r);
                }
              })(e, r, t, n)),
          r
        );
      }
      function gu(e, t) {
        const n = ti(e, t);
        if (n >= 0) return e[1 | n];
      }
      function ti(e, t) {
        return (function om(e, t, n) {
          let r = 0,
            i = e.length >> n;
          for (; i !== r; ) {
            const o = r + ((i - r) >> 1),
              s = e[o << n];
            if (t === s) return o << n;
            s > t ? (i = o) : (r = o + 1);
          }
          return ~(i << n);
        })(e, t, 1);
      }
      const dr = Qi(Xr("Optional"), 8),
        mo = Qi(Xr("SkipSelf"), 4);
      function oa(e) {
        return 128 == (128 & e.flags);
      }
      var Un = (function (e) {
        return (
          (e[(e.Important = 1)] = "Important"),
          (e[(e.DashCase = 2)] = "DashCase"),
          e
        );
      })(Un || {});
      const Du = new Map();
      let y0 = 0;
      const Cu = "__ngContext__";
      function He(e, t) {
        it(t)
          ? ((e[Cu] = t[no]),
            (function v0(e) {
              Du.set(e[no], e);
            })(t))
          : (e[Cu] = t);
      }
      let wu;
      function bu(e, t) {
        return wu(e, t);
      }
      function vo(e) {
        const t = e[he];
        return Ge(t) ? t[he] : t;
      }
      function Mm(e) {
        return Sm(e[eo]);
      }
      function Im(e) {
        return Sm(e[Bt]);
      }
      function Sm(e) {
        for (; null !== e && !Ge(e); ) e = e[Bt];
        return e;
      }
      function ii(e, t, n, r, i) {
        if (null != r) {
          let o,
            s = !1;
          Ge(r) ? (o = r) : it(r) && ((s = !0), (r = r[me]));
          const a = le(r);
          0 === e && null !== n
            ? null == i
              ? Nm(t, n, a)
              : fr(t, n, a, i || null, !0)
            : 1 === e && null !== n
            ? fr(t, n, a, i || null, !0)
            : 2 === e
            ? (function fa(e, t, n) {
                const r = ua(e, t);
                r &&
                  (function j0(e, t, n, r) {
                    e.removeChild(t, n, r);
                  })(e, r, t, n);
              })(t, a, s)
            : 3 === e && t.destroyNode(a),
            null != o &&
              (function V0(e, t, n, r, i) {
                const o = n[Jt];
                o !== le(n) && ii(t, e, r, o, i);
                for (let a = Pe; a < n.length; a++) {
                  const c = n[a];
                  Eo(c[w], c, e, t, r, o);
                }
              })(t, e, o, n, i);
        }
      }
      function ca(e, t, n) {
        return e.createElement(t, n);
      }
      function Am(e, t) {
        const n = e[Ur],
          r = n.indexOf(t);
        Sg(t), n.splice(r, 1);
      }
      function la(e, t) {
        if (e.length <= Pe) return;
        const n = Pe + t,
          r = e[n];
        if (r) {
          const i = r[to];
          null !== i && i !== e && Am(i, r), t > 0 && (e[n - 1][Bt] = r[Bt]);
          const o = Js(e, Pe + t);
          !(function O0(e, t) {
            Eo(e, t, t[j], 2, null, null), (t[me] = null), (t[Be] = null);
          })(r[w], r);
          const s = o[Xt];
          null !== s && s.detachView(o[w]),
            (r[he] = null),
            (r[Bt] = null),
            (r[V] &= -129);
        }
        return r;
      }
      function Iu(e, t) {
        if (!(256 & t[V])) {
          const n = t[j];
          t[ro] && fg(t[ro]),
            t[io] && fg(t[io]),
            n.destroyNode && Eo(e, t, n, 3, null, null),
            (function x0(e) {
              let t = e[eo];
              if (!t) return Su(e[w], e);
              for (; t; ) {
                let n = null;
                if (it(t)) n = t[eo];
                else {
                  const r = t[Pe];
                  r && (n = r);
                }
                if (!n) {
                  for (; t && !t[Bt] && t !== e; )
                    it(t) && Su(t[w], t), (t = t[he]);
                  null === t && (t = e), it(t) && Su(t[w], t), (n = t && t[Bt]);
                }
                t = n;
              }
            })(t);
        }
      }
      function Su(e, t) {
        if (!(256 & t[V])) {
          (t[V] &= -129),
            (t[V] |= 256),
            (function L0(e, t) {
              let n;
              if (null != e && null != (n = e.destroyHooks))
                for (let r = 0; r < n.length; r += 2) {
                  const i = t[n[r]];
                  if (!(i instanceof co)) {
                    const o = n[r + 1];
                    if (Array.isArray(o))
                      for (let s = 0; s < o.length; s += 2) {
                        const a = i[o[s]],
                          c = o[s + 1];
                        en(4, a, c);
                        try {
                          c.call(a);
                        } finally {
                          en(5, a, c);
                        }
                      }
                    else {
                      en(4, i, o);
                      try {
                        o.call(i);
                      } finally {
                        en(5, i, o);
                      }
                    }
                  }
                }
            })(e, t),
            (function k0(e, t) {
              const n = e.cleanup,
                r = t[Br];
              if (null !== n)
                for (let o = 0; o < n.length - 1; o += 2)
                  if ("string" == typeof n[o]) {
                    const s = n[o + 3];
                    s >= 0 ? r[s]() : r[-s].unsubscribe(), (o += 2);
                  } else n[o].call(r[n[o + 1]]);
              null !== r && (t[Br] = null);
              const i = t[Bn];
              if (null !== i) {
                t[Bn] = null;
                for (let o = 0; o < i.length; o++) (0, i[o])();
              }
            })(e, t),
            1 === t[w].type && t[j].destroy();
          const n = t[to];
          if (null !== n && Ge(t[he])) {
            n !== t[he] && Am(n, t);
            const r = t[Xt];
            null !== r && r.detachView(e);
          }
          !(function D0(e) {
            Du.delete(e[no]);
          })(t);
        }
      }
      function Tu(e, t, n) {
        return (function Om(e, t, n) {
          let r = t;
          for (; null !== r && 40 & r.type; ) r = (t = r).parent;
          if (null === r) return n[me];
          {
            const { componentOffset: i } = r;
            if (i > -1) {
              const { encapsulation: o } = e.data[r.directiveStart + i];
              if (o === St.None || o === St.Emulated) return null;
            }
            return ot(r, n);
          }
        })(e, t.parent, n);
      }
      function fr(e, t, n, r, i) {
        e.insertBefore(t, n, r, i);
      }
      function Nm(e, t, n) {
        e.appendChild(t, n);
      }
      function Rm(e, t, n, r, i) {
        null !== r ? fr(e, t, n, r, i) : Nm(e, t, n);
      }
      function ua(e, t) {
        return e.parentNode(t);
      }
      function xm(e, t, n) {
        return Fm(e, t, n);
      }
      let Au,
        ha,
        xu,
        pa,
        Fm = function Pm(e, t, n) {
          return 40 & e.type ? ot(e, n) : null;
        };
      function da(e, t, n, r) {
        const i = Tu(e, r, t),
          o = t[j],
          a = xm(r.parent || t[Be], r, t);
        if (null != i)
          if (Array.isArray(n))
            for (let c = 0; c < n.length; c++) Rm(o, i, n[c], a, !1);
          else Rm(o, i, n, a, !1);
        void 0 !== Au && Au(o, r, t, n, i);
      }
      function Do(e, t) {
        if (null !== t) {
          const n = t.type;
          if (3 & n) return ot(t, e);
          if (4 & n) return Ou(-1, e[t.index]);
          if (8 & n) {
            const r = t.child;
            if (null !== r) return Do(e, r);
            {
              const i = e[t.index];
              return Ge(i) ? Ou(-1, i) : le(i);
            }
          }
          if (32 & n) return bu(t, e)() || le(e[t.index]);
          {
            const r = Lm(e, t);
            return null !== r
              ? Array.isArray(r)
                ? r[0]
                : Do(vo(e[Ce]), r)
              : Do(e, t.next);
          }
        }
        return null;
      }
      function Lm(e, t) {
        return null !== t ? e[Ce][Be].projection[t.projection] : null;
      }
      function Ou(e, t) {
        const n = Pe + e + 1;
        if (n < t.length) {
          const r = t[n],
            i = r[w].firstChild;
          if (null !== i) return Do(r, i);
        }
        return t[Jt];
      }
      function Nu(e, t, n, r, i, o, s) {
        for (; null != n; ) {
          const a = r[n.index],
            c = n.type;
          if (
            (s && 0 === t && (a && He(le(a), r), (n.flags |= 2)),
            32 != (32 & n.flags))
          )
            if (8 & c) Nu(e, t, n.child, r, i, o, !1), ii(t, e, i, a, o);
            else if (32 & c) {
              const l = bu(n, r);
              let u;
              for (; (u = l()); ) ii(t, e, i, u, o);
              ii(t, e, i, a, o);
            } else 16 & c ? Bm(e, t, r, n, i, o) : ii(t, e, i, a, o);
          n = s ? n.projectionNext : n.next;
        }
      }
      function Eo(e, t, n, r, i, o) {
        Nu(n, r, e.firstChild, t, i, o, !1);
      }
      function Bm(e, t, n, r, i, o) {
        const s = n[Ce],
          c = s[Be].projection[r.projection];
        if (Array.isArray(c))
          for (let l = 0; l < c.length; l++) ii(t, e, i, c[l], o);
        else {
          let l = c;
          const u = s[he];
          oa(r) && (l.flags |= 128), Nu(e, t, l, u, i, o, !0);
        }
      }
      function Hm(e, t, n) {
        "" === n
          ? e.removeAttribute(t, "class")
          : e.setAttribute(t, "class", n);
      }
      function Vm(e, t, n) {
        const { mergedAttrs: r, classes: i, styles: o } = n;
        null !== r && Ul(e, t, r),
          null !== i && Hm(e, t, i),
          null !== o &&
            (function U0(e, t, n) {
              e.setAttribute(t, "style", n);
            })(e, t, o);
      }
      function oi(e) {
        return (
          (function Ru() {
            if (void 0 === ha && ((ha = null), ce.trustedTypes))
              try {
                ha = ce.trustedTypes.createPolicy("angular", {
                  createHTML: (e) => e,
                  createScript: (e) => e,
                  createScriptURL: (e) => e,
                });
              } catch {}
            return ha;
          })()?.createHTML(e) || e
        );
      }
      function zm(e) {
        return (
          (function Pu() {
            if (void 0 === pa && ((pa = null), ce.trustedTypes))
              try {
                pa = ce.trustedTypes.createPolicy("angular#unsafe-bypass", {
                  createHTML: (e) => e,
                  createScript: (e) => e,
                  createScriptURL: (e) => e,
                });
              } catch {}
            return pa;
          })()?.createScriptURL(e) || e
        );
      }
      class hr {
        constructor(t) {
          this.changingThisBreaksApplicationSecurity = t;
        }
        toString() {
          return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${Pp})`;
        }
      }
      class K0 extends hr {
        getTypeName() {
          return "HTML";
        }
      }
      class Z0 extends hr {
        getTypeName() {
          return "Style";
        }
      }
      class Q0 extends hr {
        getTypeName() {
          return "Script";
        }
      }
      class Y0 extends hr {
        getTypeName() {
          return "URL";
        }
      }
      class X0 extends hr {
        getTypeName() {
          return "ResourceURL";
        }
      }
      function gt(e) {
        return e instanceof hr ? e.changingThisBreaksApplicationSecurity : e;
      }
      function rn(e, t) {
        const n = (function J0(e) {
          return (e instanceof hr && e.getTypeName()) || null;
        })(e);
        if (null != n && n !== t) {
          if ("ResourceURL" === n && "URL" === t) return !0;
          throw new Error(`Required a safe ${t}, got a ${n} (see ${Pp})`);
        }
        return n === t;
      }
      class oT {
        constructor(t) {
          this.inertDocumentHelper = t;
        }
        getInertBodyElement(t) {
          t = "<body><remove></remove>" + t;
          try {
            const n = new window.DOMParser().parseFromString(
              oi(t),
              "text/html"
            ).body;
            return null === n
              ? this.inertDocumentHelper.getInertBodyElement(t)
              : (n.removeChild(n.firstChild), n);
          } catch {
            return null;
          }
        }
      }
      class sT {
        constructor(t) {
          (this.defaultDoc = t),
            (this.inertDocument =
              this.defaultDoc.implementation.createHTMLDocument(
                "sanitization-inert"
              ));
        }
        getInertBodyElement(t) {
          const n = this.inertDocument.createElement("template");
          return (n.innerHTML = oi(t)), n;
        }
      }
      const cT = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;
      function ga(e) {
        return (e = String(e)).match(cT) ? e : "unsafe:" + e;
      }
      function wn(e) {
        const t = {};
        for (const n of e.split(",")) t[n] = !0;
        return t;
      }
      function Co(...e) {
        const t = {};
        for (const n of e)
          for (const r in n) n.hasOwnProperty(r) && (t[r] = !0);
        return t;
      }
      const Gm = wn("area,br,col,hr,img,wbr"),
        Wm = wn("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),
        Km = wn("rp,rt"),
        Fu = Co(
          Gm,
          Co(
            Wm,
            wn(
              "address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul"
            )
          ),
          Co(
            Km,
            wn(
              "a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video"
            )
          ),
          Co(Km, Wm)
        ),
        ku = wn("background,cite,href,itemtype,longdesc,poster,src,xlink:href"),
        Zm = Co(
          ku,
          wn(
            "abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,srcset,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width"
          ),
          wn(
            "aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext"
          )
        ),
        lT = wn("script,style,template");
      class uT {
        constructor() {
          (this.sanitizedSomething = !1), (this.buf = []);
        }
        sanitizeChildren(t) {
          let n = t.firstChild,
            r = !0;
          for (; n; )
            if (
              (n.nodeType === Node.ELEMENT_NODE
                ? (r = this.startElement(n))
                : n.nodeType === Node.TEXT_NODE
                ? this.chars(n.nodeValue)
                : (this.sanitizedSomething = !0),
              r && n.firstChild)
            )
              n = n.firstChild;
            else
              for (; n; ) {
                n.nodeType === Node.ELEMENT_NODE && this.endElement(n);
                let i = this.checkClobberedElement(n, n.nextSibling);
                if (i) {
                  n = i;
                  break;
                }
                n = this.checkClobberedElement(n, n.parentNode);
              }
          return this.buf.join("");
        }
        startElement(t) {
          const n = t.nodeName.toLowerCase();
          if (!Fu.hasOwnProperty(n))
            return (this.sanitizedSomething = !0), !lT.hasOwnProperty(n);
          this.buf.push("<"), this.buf.push(n);
          const r = t.attributes;
          for (let i = 0; i < r.length; i++) {
            const o = r.item(i),
              s = o.name,
              a = s.toLowerCase();
            if (!Zm.hasOwnProperty(a)) {
              this.sanitizedSomething = !0;
              continue;
            }
            let c = o.value;
            ku[a] && (c = ga(c)), this.buf.push(" ", s, '="', Qm(c), '"');
          }
          return this.buf.push(">"), !0;
        }
        endElement(t) {
          const n = t.nodeName.toLowerCase();
          Fu.hasOwnProperty(n) &&
            !Gm.hasOwnProperty(n) &&
            (this.buf.push("</"), this.buf.push(n), this.buf.push(">"));
        }
        chars(t) {
          this.buf.push(Qm(t));
        }
        checkClobberedElement(t, n) {
          if (
            n &&
            (t.compareDocumentPosition(n) &
              Node.DOCUMENT_POSITION_CONTAINED_BY) ===
              Node.DOCUMENT_POSITION_CONTAINED_BY
          )
            throw new Error(
              `Failed to sanitize html because the element is clobbered: ${t.outerHTML}`
            );
          return n;
        }
      }
      const dT = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
        fT = /([^\#-~ |!])/g;
      function Qm(e) {
        return e
          .replace(/&/g, "&amp;")
          .replace(dT, function (t) {
            return (
              "&#" +
              (1024 * (t.charCodeAt(0) - 55296) +
                (t.charCodeAt(1) - 56320) +
                65536) +
              ";"
            );
          })
          .replace(fT, function (t) {
            return "&#" + t.charCodeAt(0) + ";";
          })
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
      }
      let ma;
      function Ym(e, t) {
        let n = null;
        try {
          ma =
            ma ||
            (function qm(e) {
              const t = new sT(e);
              return (function aT() {
                try {
                  return !!new window.DOMParser().parseFromString(
                    oi(""),
                    "text/html"
                  );
                } catch {
                  return !1;
                }
              })()
                ? new oT(t)
                : t;
            })(e);
          let r = t ? String(t) : "";
          n = ma.getInertBodyElement(r);
          let i = 5,
            o = r;
          do {
            if (0 === i)
              throw new Error(
                "Failed to sanitize html because the input is unstable"
              );
            i--, (r = o), (o = n.innerHTML), (n = ma.getInertBodyElement(r));
          } while (r !== o);
          return oi(new uT().sanitizeChildren(Lu(n) || n));
        } finally {
          if (n) {
            const r = Lu(n) || n;
            for (; r.firstChild; ) r.removeChild(r.firstChild);
          }
        }
      }
      function Lu(e) {
        return "content" in e &&
          (function hT(e) {
            return (
              e.nodeType === Node.ELEMENT_NODE && "TEMPLATE" === e.nodeName
            );
          })(e)
          ? e.content
          : null;
      }
      var Le = (function (e) {
        return (
          (e[(e.NONE = 0)] = "NONE"),
          (e[(e.HTML = 1)] = "HTML"),
          (e[(e.STYLE = 2)] = "STYLE"),
          (e[(e.SCRIPT = 3)] = "SCRIPT"),
          (e[(e.URL = 4)] = "URL"),
          (e[(e.RESOURCE_URL = 5)] = "RESOURCE_URL"),
          e
        );
      })(Le || {});
      function ya(e) {
        const t = wo();
        return t
          ? t.sanitize(Le.URL, e) || ""
          : rn(e, "URL")
          ? gt(e)
          : ga(L(e));
      }
      function Xm(e) {
        const t = wo();
        if (t) return zm(t.sanitize(Le.RESOURCE_URL, e) || "");
        if (rn(e, "ResourceURL")) return zm(gt(e));
        throw new _(904, !1);
      }
      function wo() {
        const e = D();
        return e && e[Hr].sanitizer;
      }
      const bo = new E("ENVIRONMENT_INITIALIZER"),
        ey = new E("INJECTOR", -1),
        ty = new E("INJECTOR_DEF_TYPES");
      class ju {
        get(t, n = Zi) {
          if (n === Zi) {
            const r = new Error(`NullInjectorError: No provider for ${Ie(t)}!`);
            throw ((r.name = "NullInjectorError"), r);
          }
          return n;
        }
      }
      function DT(...e) {
        return { ɵproviders: ry(0, e), ɵfromNgModule: !0 };
      }
      function ry(e, ...t) {
        const n = [],
          r = new Set();
        let i;
        const o = (s) => {
          n.push(s);
        };
        return (
          ei(t, (s) => {
            const a = s;
            _a(a, o, [], r) && ((i ||= []), i.push(a));
          }),
          void 0 !== i && iy(i, o),
          n
        );
      }
      function iy(e, t) {
        for (let n = 0; n < e.length; n++) {
          const { ngModule: r, providers: i } = e[n];
          Bu(i, (o) => {
            t(o, r);
          });
        }
      }
      function _a(e, t, n, r) {
        if (!(e = k(e))) return !1;
        let i = null,
          o = xs(e);
        const s = !o && G(e);
        if (o || s) {
          if (s && !s.standalone) return !1;
          i = e;
        } else {
          const c = e.ngModule;
          if (((o = xs(c)), !o)) return !1;
          i = c;
        }
        const a = r.has(i);
        if (s) {
          if (a) return !1;
          if ((r.add(i), s.dependencies)) {
            const c =
              "function" == typeof s.dependencies
                ? s.dependencies()
                : s.dependencies;
            for (const l of c) _a(l, t, n, r);
          }
        } else {
          if (!o) return !1;
          {
            if (null != o.imports && !a) {
              let l;
              r.add(i);
              try {
                ei(o.imports, (u) => {
                  _a(u, t, n, r) && ((l ||= []), l.push(u));
                });
              } finally {
              }
              void 0 !== l && iy(l, t);
            }
            if (!a) {
              const l = ar(i) || (() => new i());
              t({ provide: i, useFactory: l, deps: Q }, i),
                t({ provide: ty, useValue: i, multi: !0 }, i),
                t({ provide: bo, useValue: () => C(i), multi: !0 }, i);
            }
            const c = o.providers;
            if (null != c && !a) {
              const l = e;
              Bu(c, (u) => {
                t(u, l);
              });
            }
          }
        }
        return i !== e && void 0 !== e.providers;
      }
      function Bu(e, t) {
        for (let n of e)
          Nl(n) && (n = n.ɵproviders), Array.isArray(n) ? Bu(n, t) : t(n);
      }
      const ET = ee({ provide: String, useValue: ee });
      function Hu(e) {
        return null !== e && "object" == typeof e && ET in e;
      }
      function pr(e) {
        return "function" == typeof e;
      }
      const Vu = new E("Set Injector scope."),
        va = {},
        wT = {};
      let $u;
      function Da() {
        return void 0 === $u && ($u = new ju()), $u;
      }
      class Ot {}
      class ai extends Ot {
        get destroyed() {
          return this._destroyed;
        }
        constructor(t, n, r, i) {
          super(),
            (this.parent = n),
            (this.source = r),
            (this.scopes = i),
            (this.records = new Map()),
            (this._ngOnDestroyHooks = new Set()),
            (this._onDestroyHooks = []),
            (this._destroyed = !1),
            zu(t, (s) => this.processProvider(s)),
            this.records.set(ey, ci(void 0, this)),
            i.has("environment") && this.records.set(Ot, ci(void 0, this));
          const o = this.records.get(Vu);
          null != o && "string" == typeof o.value && this.scopes.add(o.value),
            (this.injectorDefTypes = new Set(this.get(ty.multi, Q, z.Self)));
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0);
          try {
            for (const n of this._ngOnDestroyHooks) n.ngOnDestroy();
            const t = this._onDestroyHooks;
            this._onDestroyHooks = [];
            for (const n of t) n();
          } finally {
            this.records.clear(),
              this._ngOnDestroyHooks.clear(),
              this.injectorDefTypes.clear();
          }
        }
        onDestroy(t) {
          return (
            this.assertNotDestroyed(),
            this._onDestroyHooks.push(t),
            () => this.removeOnDestroy(t)
          );
        }
        runInContext(t) {
          this.assertNotDestroyed();
          const n = Ln(this),
            r = nt(void 0);
          try {
            return t();
          } finally {
            Ln(n), nt(r);
          }
        }
        get(t, n = Zi, r = z.Default) {
          if ((this.assertNotDestroyed(), t.hasOwnProperty(Up)))
            return t[Up](this);
          r = ks(r);
          const o = Ln(this),
            s = nt(void 0);
          try {
            if (!(r & z.SkipSelf)) {
              let c = this.records.get(t);
              if (void 0 === c) {
                const l =
                  (function TT(e) {
                    return (
                      "function" == typeof e ||
                      ("object" == typeof e && e instanceof E)
                    );
                  })(t) && Rs(t);
                (c = l && this.injectableDefInScope(l) ? ci(Uu(t), va) : null),
                  this.records.set(t, c);
              }
              if (null != c) return this.hydrate(t, c);
            }
            return (r & z.Self ? Da() : this.parent).get(
              t,
              (n = r & z.Optional && n === Zi ? null : n)
            );
          } catch (a) {
            if ("NullInjectorError" === a.name) {
              if (((a[Fs] = a[Fs] || []).unshift(Ie(t)), o)) throw a;
              return (function mI(e, t, n, r) {
                const i = e[Fs];
                throw (
                  (t[Hp] && i.unshift(t[Hp]),
                  (e.message = (function yI(e, t, n, r = null) {
                    e =
                      e && "\n" === e.charAt(0) && "\u0275" == e.charAt(1)
                        ? e.slice(2)
                        : e;
                    let i = Ie(t);
                    if (Array.isArray(t)) i = t.map(Ie).join(" -> ");
                    else if ("object" == typeof t) {
                      let o = [];
                      for (let s in t)
                        if (t.hasOwnProperty(s)) {
                          let a = t[s];
                          o.push(
                            s +
                              ":" +
                              ("string" == typeof a ? JSON.stringify(a) : Ie(a))
                          );
                        }
                      i = `{${o.join(", ")}}`;
                    }
                    return `${n}${r ? "(" + r + ")" : ""}[${i}]: ${e.replace(
                      dI,
                      "\n  "
                    )}`;
                  })("\n" + e.message, i, n, r)),
                  (e.ngTokenPath = i),
                  (e[Fs] = null),
                  e)
                );
              })(a, t, "R3InjectorError", this.source);
            }
            throw a;
          } finally {
            nt(s), Ln(o);
          }
        }
        resolveInjectorInitializers() {
          const t = Ln(this),
            n = nt(void 0);
          try {
            const i = this.get(bo.multi, Q, z.Self);
            for (const o of i) o();
          } finally {
            Ln(t), nt(n);
          }
        }
        toString() {
          const t = [],
            n = this.records;
          for (const r of n.keys()) t.push(Ie(r));
          return `R3Injector[${t.join(", ")}]`;
        }
        assertNotDestroyed() {
          if (this._destroyed) throw new _(205, !1);
        }
        processProvider(t) {
          let n = pr((t = k(t))) ? t : k(t && t.provide);
          const r = (function MT(e) {
            return Hu(e)
              ? ci(void 0, e.useValue)
              : ci(
                  (function ay(e, t, n) {
                    let r;
                    if (pr(e)) {
                      const i = k(e);
                      return ar(i) || Uu(i);
                    }
                    if (Hu(e)) r = () => k(e.useValue);
                    else if (
                      (function sy(e) {
                        return !(!e || !e.useFactory);
                      })(e)
                    )
                      r = () => e.useFactory(...Hl(e.deps || []));
                    else if (
                      (function oy(e) {
                        return !(!e || !e.useExisting);
                      })(e)
                    )
                      r = () => C(k(e.useExisting));
                    else {
                      const i = k(e && (e.useClass || e.provide));
                      if (
                        !(function IT(e) {
                          return !!e.deps;
                        })(e)
                      )
                        return ar(i) || Uu(i);
                      r = () => new i(...Hl(e.deps));
                    }
                    return r;
                  })(e),
                  va
                );
          })(t);
          if (pr(t) || !0 !== t.multi) this.records.get(n);
          else {
            let i = this.records.get(n);
            i ||
              ((i = ci(void 0, va, !0)),
              (i.factory = () => Hl(i.multi)),
              this.records.set(n, i)),
              (n = t),
              i.multi.push(t);
          }
          this.records.set(n, r);
        }
        hydrate(t, n) {
          return (
            n.value === va && ((n.value = wT), (n.value = n.factory())),
            "object" == typeof n.value &&
              n.value &&
              (function ST(e) {
                return (
                  null !== e &&
                  "object" == typeof e &&
                  "function" == typeof e.ngOnDestroy
                );
              })(n.value) &&
              this._ngOnDestroyHooks.add(n.value),
            n.value
          );
        }
        injectableDefInScope(t) {
          if (!t.providedIn) return !1;
          const n = k(t.providedIn);
          return "string" == typeof n
            ? "any" === n || this.scopes.has(n)
            : this.injectorDefTypes.has(n);
        }
        removeOnDestroy(t) {
          const n = this._onDestroyHooks.indexOf(t);
          -1 !== n && this._onDestroyHooks.splice(n, 1);
        }
      }
      function Uu(e) {
        const t = Rs(e),
          n = null !== t ? t.factory : ar(e);
        if (null !== n) return n;
        if (e instanceof E) throw new _(204, !1);
        if (e instanceof Function)
          return (function bT(e) {
            const t = e.length;
            if (t > 0) throw (go(t, "?"), new _(204, !1));
            const n = (function aI(e) {
              return (e && (e[Ps] || e[kp])) || null;
            })(e);
            return null !== n ? () => n.factory(e) : () => new e();
          })(e);
        throw new _(204, !1);
      }
      function ci(e, t, n = !1) {
        return { factory: e, value: t, multi: n ? [] : void 0 };
      }
      function zu(e, t) {
        for (const n of e)
          Array.isArray(n) ? zu(n, t) : n && Nl(n) ? zu(n.ɵproviders, t) : t(n);
      }
      const Ea = new E("AppId", { providedIn: "root", factory: () => AT }),
        AT = "ng",
        cy = new E("Platform Initializer"),
        gr = new E("Platform ID", {
          providedIn: "platform",
          factory: () => "unknown",
        }),
        ly = new E("AnimationModuleType"),
        qu = new E("CSP nonce", {
          providedIn: "root",
          factory: () =>
            (function si() {
              if (void 0 !== xu) return xu;
              if (typeof document < "u") return document;
              throw new _(210, !1);
            })()
              .body?.querySelector("[ngCspNonce]")
              ?.getAttribute("ngCspNonce") || null,
        });
      let uy = (e, t, n) => null;
      function Ju(e, t, n = !1) {
        return uy(e, t, n);
      }
      class BT {}
      class hy {}
      class VT {
        resolveComponentFactory(t) {
          throw (function HT(e) {
            const t = Error(`No component factory found for ${Ie(e)}.`);
            return (t.ngComponent = e), t;
          })(t);
        }
      }
      let Sa = (() => {
        class e {
          static #e = (this.NULL = new VT());
        }
        return e;
      })();
      function $T() {
        return di(ke(), D());
      }
      function di(e, t) {
        return new on(ot(e, t));
      }
      let on = (() => {
        class e {
          constructor(n) {
            this.nativeElement = n;
          }
          static #e = (this.__NG_ELEMENT_ID__ = $T);
        }
        return e;
      })();
      function UT(e) {
        return e instanceof on ? e.nativeElement : e;
      }
      class So {}
      let Ta = (() => {
          class e {
            constructor() {
              this.destroyNode = null;
            }
            static #e = (this.__NG_ELEMENT_ID__ = () =>
              (function zT() {
                const e = D(),
                  n = ht(ke().index, e);
                return (it(n) ? n : e)[j];
              })());
          }
          return e;
        })(),
        qT = (() => {
          class e {
            static #e = (this.ɵprov = T({
              token: e,
              providedIn: "root",
              factory: () => null,
            }));
          }
          return e;
        })();
      class fi {
        constructor(t) {
          (this.full = t),
            (this.major = t.split(".")[0]),
            (this.minor = t.split(".")[1]),
            (this.patch = t.split(".").slice(2).join("."));
        }
      }
      const GT = new fi("16.2.12"),
        nd = {};
      function _y(e, t = null, n = null, r) {
        const i = vy(e, t, n, r);
        return i.resolveInjectorInitializers(), i;
      }
      function vy(e, t = null, n = null, r, i = new Set()) {
        const o = [n || Q, DT(e)];
        return (
          (r = r || ("object" == typeof e ? void 0 : Ie(e))),
          new ai(o, t || Da(), r || null, i)
        );
      }
      let mt = (() => {
        class e {
          static #e = (this.THROW_IF_NOT_FOUND = Zi);
          static #t = (this.NULL = new ju());
          static create(n, r) {
            if (Array.isArray(n)) return _y({ name: "" }, r, n, "");
            {
              const i = n.name ?? "";
              return _y({ name: i }, n.parent, n.providers, i);
            }
          }
          static #n = (this.ɵprov = T({
            token: e,
            providedIn: "any",
            factory: () => C(ey),
          }));
          static #r = (this.__NG_ELEMENT_ID__ = -1);
        }
        return e;
      })();
      function id(e) {
        return e.ngOriginalError;
      }
      class Nt {
        constructor() {
          this._console = console;
        }
        handleError(t) {
          const n = this._findOriginalError(t);
          this._console.error("ERROR", t),
            n && this._console.error("ORIGINAL ERROR", n);
        }
        _findOriginalError(t) {
          let n = t && id(t);
          for (; n && id(n); ) n = id(n);
          return n || null;
        }
      }
      function sd(e) {
        return (t) => {
          setTimeout(e, void 0, t);
        };
      }
      const Qe = class JT extends bt {
        constructor(t = !1) {
          super(), (this.__isAsync = t);
        }
        emit(t) {
          super.next(t);
        }
        subscribe(t, n, r) {
          let i = t,
            o = n || (() => null),
            s = r;
          if (t && "object" == typeof t) {
            const c = t;
            (i = c.next?.bind(c)),
              (o = c.error?.bind(c)),
              (s = c.complete?.bind(c));
          }
          this.__isAsync && ((o = sd(o)), i && (i = sd(i)), s && (s = sd(s)));
          const a = super.subscribe({ next: i, error: o, complete: s });
          return t instanceof Ue && t.add(a), a;
        }
      };
      function Ey(...e) {}
      class te {
        constructor({
          enableLongStackTrace: t = !1,
          shouldCoalesceEventChangeDetection: n = !1,
          shouldCoalesceRunChangeDetection: r = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new Qe(!1)),
            (this.onMicrotaskEmpty = new Qe(!1)),
            (this.onStable = new Qe(!1)),
            (this.onError = new Qe(!1)),
            typeof Zone > "u")
          )
            throw new _(908, !1);
          Zone.assertZonePatched();
          const i = this;
          (i._nesting = 0),
            (i._outer = i._inner = Zone.current),
            Zone.TaskTrackingZoneSpec &&
              (i._inner = i._inner.fork(new Zone.TaskTrackingZoneSpec())),
            t &&
              Zone.longStackTraceZoneSpec &&
              (i._inner = i._inner.fork(Zone.longStackTraceZoneSpec)),
            (i.shouldCoalesceEventChangeDetection = !r && n),
            (i.shouldCoalesceRunChangeDetection = r),
            (i.lastRequestAnimationFrameId = -1),
            (i.nativeRequestAnimationFrame = (function eA() {
              const e = "function" == typeof ce.requestAnimationFrame;
              let t = ce[e ? "requestAnimationFrame" : "setTimeout"],
                n = ce[e ? "cancelAnimationFrame" : "clearTimeout"];
              if (typeof Zone < "u" && t && n) {
                const r = t[Zone.__symbol__("OriginalDelegate")];
                r && (t = r);
                const i = n[Zone.__symbol__("OriginalDelegate")];
                i && (n = i);
              }
              return {
                nativeRequestAnimationFrame: t,
                nativeCancelAnimationFrame: n,
              };
            })().nativeRequestAnimationFrame),
            (function rA(e) {
              const t = () => {
                !(function nA(e) {
                  e.isCheckStableRunning ||
                    -1 !== e.lastRequestAnimationFrameId ||
                    ((e.lastRequestAnimationFrameId =
                      e.nativeRequestAnimationFrame.call(ce, () => {
                        e.fakeTopEventTask ||
                          (e.fakeTopEventTask = Zone.root.scheduleEventTask(
                            "fakeTopEventTask",
                            () => {
                              (e.lastRequestAnimationFrameId = -1),
                                cd(e),
                                (e.isCheckStableRunning = !0),
                                ad(e),
                                (e.isCheckStableRunning = !1);
                            },
                            void 0,
                            () => {},
                            () => {}
                          )),
                          e.fakeTopEventTask.invoke();
                      })),
                    cd(e));
                })(e);
              };
              e._inner = e._inner.fork({
                name: "angular",
                properties: { isAngularZone: !0 },
                onInvokeTask: (n, r, i, o, s, a) => {
                  if (
                    (function oA(e) {
                      return (
                        !(!Array.isArray(e) || 1 !== e.length) &&
                        !0 === e[0].data?.__ignore_ng_zone__
                      );
                    })(a)
                  )
                    return n.invokeTask(i, o, s, a);
                  try {
                    return Cy(e), n.invokeTask(i, o, s, a);
                  } finally {
                    ((e.shouldCoalesceEventChangeDetection &&
                      "eventTask" === o.type) ||
                      e.shouldCoalesceRunChangeDetection) &&
                      t(),
                      wy(e);
                  }
                },
                onInvoke: (n, r, i, o, s, a, c) => {
                  try {
                    return Cy(e), n.invoke(i, o, s, a, c);
                  } finally {
                    e.shouldCoalesceRunChangeDetection && t(), wy(e);
                  }
                },
                onHasTask: (n, r, i, o) => {
                  n.hasTask(i, o),
                    r === i &&
                      ("microTask" == o.change
                        ? ((e._hasPendingMicrotasks = o.microTask),
                          cd(e),
                          ad(e))
                        : "macroTask" == o.change &&
                          (e.hasPendingMacrotasks = o.macroTask));
                },
                onHandleError: (n, r, i, o) => (
                  n.handleError(i, o),
                  e.runOutsideAngular(() => e.onError.emit(o)),
                  !1
                ),
              });
            })(i);
        }
        static isInAngularZone() {
          return typeof Zone < "u" && !0 === Zone.current.get("isAngularZone");
        }
        static assertInAngularZone() {
          if (!te.isInAngularZone()) throw new _(909, !1);
        }
        static assertNotInAngularZone() {
          if (te.isInAngularZone()) throw new _(909, !1);
        }
        run(t, n, r) {
          return this._inner.run(t, n, r);
        }
        runTask(t, n, r, i) {
          const o = this._inner,
            s = o.scheduleEventTask("NgZoneEvent: " + i, t, tA, Ey, Ey);
          try {
            return o.runTask(s, n, r);
          } finally {
            o.cancelTask(s);
          }
        }
        runGuarded(t, n, r) {
          return this._inner.runGuarded(t, n, r);
        }
        runOutsideAngular(t) {
          return this._outer.run(t);
        }
      }
      const tA = {};
      function ad(e) {
        if (0 == e._nesting && !e.hasPendingMicrotasks && !e.isStable)
          try {
            e._nesting++, e.onMicrotaskEmpty.emit(null);
          } finally {
            if ((e._nesting--, !e.hasPendingMicrotasks))
              try {
                e.runOutsideAngular(() => e.onStable.emit(null));
              } finally {
                e.isStable = !0;
              }
          }
      }
      function cd(e) {
        e.hasPendingMicrotasks = !!(
          e._hasPendingMicrotasks ||
          ((e.shouldCoalesceEventChangeDetection ||
            e.shouldCoalesceRunChangeDetection) &&
            -1 !== e.lastRequestAnimationFrameId)
        );
      }
      function Cy(e) {
        e._nesting++,
          e.isStable && ((e.isStable = !1), e.onUnstable.emit(null));
      }
      function wy(e) {
        e._nesting--, ad(e);
      }
      class iA {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new Qe()),
            (this.onMicrotaskEmpty = new Qe()),
            (this.onStable = new Qe()),
            (this.onError = new Qe());
        }
        run(t, n, r) {
          return t.apply(n, r);
        }
        runGuarded(t, n, r) {
          return t.apply(n, r);
        }
        runOutsideAngular(t) {
          return t();
        }
        runTask(t, n, r, i) {
          return t.apply(n, r);
        }
      }
      const by = new E("", { providedIn: "root", factory: My });
      function My() {
        const e = M(te);
        let t = !0;
        return (function YM(...e) {
          const t = Ki(e),
            n = (function zM(e, t) {
              return "number" == typeof Ml(e) ? e.pop() : t;
            })(e, 1 / 0),
            r = e;
          return r.length ? (1 === r.length ? lt(r[0]) : kr(n)(Re(r, t))) : Zt;
        })(
          new ve((i) => {
            (t =
              e.isStable && !e.hasPendingMacrotasks && !e.hasPendingMicrotasks),
              e.runOutsideAngular(() => {
                i.next(t), i.complete();
              });
          }),
          new ve((i) => {
            let o;
            e.runOutsideAngular(() => {
              o = e.onStable.subscribe(() => {
                te.assertNotInAngularZone(),
                  queueMicrotask(() => {
                    !t &&
                      !e.hasPendingMacrotasks &&
                      !e.hasPendingMicrotasks &&
                      ((t = !0), i.next(!0));
                  });
              });
            });
            const s = e.onUnstable.subscribe(() => {
              te.assertInAngularZone(),
                t &&
                  ((t = !1),
                  e.runOutsideAngular(() => {
                    i.next(!1);
                  }));
            });
            return () => {
              o.unsubscribe(), s.unsubscribe();
            };
          }).pipe(Il())
        );
      }
      function bn(e) {
        return e instanceof Function ? e() : e;
      }
      let ld = (() => {
        class e {
          constructor() {
            (this.renderDepth = 0), (this.handler = null);
          }
          begin() {
            this.handler?.validateBegin(), this.renderDepth++;
          }
          end() {
            this.renderDepth--,
              0 === this.renderDepth && this.handler?.execute();
          }
          ngOnDestroy() {
            this.handler?.destroy(), (this.handler = null);
          }
          static #e = (this.ɵprov = T({
            token: e,
            providedIn: "root",
            factory: () => new e(),
          }));
        }
        return e;
      })();
      function To(e) {
        for (; e; ) {
          e[V] |= 64;
          const t = vo(e);
          if (Gl(e) && !t) return e;
          e = t;
        }
        return null;
      }
      const Oy = new E("", { providedIn: "root", factory: () => !1 });
      let Oa = null;
      function Py(e, t) {
        return e[t] ?? Ly();
      }
      function Fy(e, t) {
        const n = Ly();
        n.producerNode?.length && ((e[t] = Oa), (n.lView = e), (Oa = ky()));
      }
      const gA = {
        ...sg,
        consumerIsAlwaysLive: !0,
        consumerMarkedDirty: (e) => {
          To(e.lView);
        },
        lView: null,
      };
      function ky() {
        return Object.create(gA);
      }
      function Ly() {
        return (Oa ??= ky()), Oa;
      }
      const H = {};
      function sn(e) {
        jy(W(), D(), Ke() + e, !1);
      }
      function jy(e, t, n, r) {
        if (!r)
          if (3 == (3 & t[V])) {
            const o = e.preOrderCheckHooks;
            null !== o && Ws(t, o, n);
          } else {
            const o = e.preOrderHooks;
            null !== o && Ks(t, o, 0, n);
          }
        lr(n);
      }
      function O(e, t = z.Default) {
        const n = D();
        return null === n ? C(e, t) : Yg(ke(), n, k(e), t);
      }
      function Na(e, t, n, r, i, o, s, a, c, l, u) {
        const d = t.blueprint.slice();
        return (
          (d[me] = i),
          (d[V] = 140 | r),
          (null !== l || (e && 2048 & e[V])) && (d[V] |= 2048),
          Ig(d),
          (d[he] = d[Vr] = e),
          (d[Ee] = n),
          (d[Hr] = s || (e && e[Hr])),
          (d[j] = a || (e && e[j])),
          (d[jn] = c || (e && e[jn]) || null),
          (d[Be] = o),
          (d[no] = (function _0() {
            return y0++;
          })()),
          (d[Dn] = u),
          (d[ng] = l),
          (d[Ce] = 2 == t.type ? e[Ce] : d),
          d
        );
      }
      function gi(e, t, n, r, i) {
        let o = e.data[t];
        if (null === o)
          (o = (function ud(e, t, n, r, i) {
            const o = Rg(),
              s = eu(),
              c = (e.data[t] = (function wA(e, t, n, r, i, o) {
                let s = t ? t.injectorIndex : -1,
                  a = 0;
                return (
                  Gr() && (a |= 128),
                  {
                    type: n,
                    index: r,
                    insertBeforeIndex: null,
                    injectorIndex: s,
                    directiveStart: -1,
                    directiveEnd: -1,
                    directiveStylingLast: -1,
                    componentOffset: -1,
                    propertyBindings: null,
                    flags: a,
                    providerIndexes: 0,
                    value: i,
                    attrs: o,
                    mergedAttrs: null,
                    localNames: null,
                    initialInputs: void 0,
                    inputs: null,
                    outputs: null,
                    tView: null,
                    next: null,
                    prev: null,
                    projectionNext: null,
                    child: null,
                    parent: t,
                    projection: null,
                    styles: null,
                    stylesWithoutHost: null,
                    residualStyles: void 0,
                    classes: null,
                    classesWithoutHost: null,
                    residualClasses: void 0,
                    classBindings: 0,
                    styleBindings: 0,
                  }
                );
              })(0, s ? o : o && o.parent, n, t, r, i));
            return (
              null === e.firstChild && (e.firstChild = c),
              null !== o &&
                (s
                  ? null == o.child && null !== c.parent && (o.child = c)
                  : null === o.next && ((o.next = c), (c.prev = o))),
              c
            );
          })(e, t, n, r, i)),
            (function mS() {
              return F.lFrame.inI18n;
            })() && (o.flags |= 32);
        else if (64 & o.type) {
          (o.type = n), (o.value = r), (o.attrs = i);
          const s = (function ao() {
            const e = F.lFrame,
              t = e.currentTNode;
            return e.isParent ? t : t.parent;
          })();
          o.injectorIndex = null === s ? -1 : s.injectorIndex;
        }
        return tn(o, !0), o;
      }
      function Ao(e, t, n, r) {
        if (0 === n) return -1;
        const i = t.length;
        for (let o = 0; o < n; o++)
          t.push(r), e.blueprint.push(r), e.data.push(null);
        return i;
      }
      function Hy(e, t, n, r, i) {
        const o = Py(t, ro),
          s = Ke(),
          a = 2 & r;
        try {
          lr(-1), a && t.length > q && jy(e, t, q, !1), en(a ? 2 : 0, i);
          const l = a ? o : null,
            u = Kl(l);
          try {
            null !== l && (l.dirty = !1), n(r, i);
          } finally {
            Zl(l, u);
          }
        } finally {
          a && null === t[ro] && Fy(t, ro), lr(s), en(a ? 3 : 1, i);
        }
      }
      function dd(e, t, n) {
        if (ql(t)) {
          const r = Tt(null);
          try {
            const o = t.directiveEnd;
            for (let s = t.directiveStart; s < o; s++) {
              const a = e.data[s];
              a.contentQueries && a.contentQueries(1, n[s], s);
            }
          } finally {
            Tt(r);
          }
        }
      }
      function fd(e, t, n) {
        Ng() &&
          ((function OA(e, t, n, r) {
            const i = n.directiveStart,
              o = n.directiveEnd;
            sr(n) &&
              (function LA(e, t, n) {
                const r = ot(t, e),
                  i = Vy(n);
                let s = 16;
                n.signals ? (s = 4096) : n.onPush && (s = 64);
                const a = Ra(
                  e,
                  Na(
                    e,
                    i,
                    null,
                    s,
                    r,
                    t,
                    null,
                    e[Hr].rendererFactory.createRenderer(r, n),
                    null,
                    null,
                    null
                  )
                );
                e[t.index] = a;
              })(t, n, e.data[i + n.componentOffset]),
              e.firstCreatePass || Qs(n, t),
              He(r, t);
            const s = n.initialInputs;
            for (let a = i; a < o; a++) {
              const c = e.data[a],
                l = ur(t, e, a, n);
              He(l, t),
                null !== s && jA(0, a - i, l, c, 0, s),
                Ht(c) && (ht(n.index, t)[Ee] = ur(t, e, a, n));
            }
          })(e, t, n, ot(n, t)),
          64 == (64 & n.flags) && Gy(e, t, n));
      }
      function hd(e, t, n = ot) {
        const r = t.localNames;
        if (null !== r) {
          let i = t.index + 1;
          for (let o = 0; o < r.length; o += 2) {
            const s = r[o + 1],
              a = -1 === s ? n(t, e) : e[s];
            e[i++] = a;
          }
        }
      }
      function Vy(e) {
        const t = e.tView;
        return null === t || t.incompleteFirstPass
          ? (e.tView = pd(
              1,
              null,
              e.template,
              e.decls,
              e.vars,
              e.directiveDefs,
              e.pipeDefs,
              e.viewQuery,
              e.schemas,
              e.consts,
              e.id
            ))
          : t;
      }
      function pd(e, t, n, r, i, o, s, a, c, l, u) {
        const d = q + r,
          f = d + i,
          h = (function yA(e, t) {
            const n = [];
            for (let r = 0; r < t; r++) n.push(r < e ? null : H);
            return n;
          })(d, f),
          p = "function" == typeof l ? l() : l;
        return (h[w] = {
          type: e,
          blueprint: h,
          template: n,
          queries: null,
          viewQuery: a,
          declTNode: t,
          data: h.slice().fill(null, d),
          bindingStartIndex: d,
          expandoStartIndex: f,
          hostBindingOpCodes: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: "function" == typeof o ? o() : o,
          pipeRegistry: "function" == typeof s ? s() : s,
          firstChild: null,
          schemas: c,
          consts: p,
          incompleteFirstPass: !1,
          ssrId: u,
        });
      }
      let $y = (e) => null;
      function Uy(e, t, n, r) {
        for (let i in e)
          if (e.hasOwnProperty(i)) {
            n = null === n ? {} : n;
            const o = e[i];
            null === r
              ? zy(n, t, i, o)
              : r.hasOwnProperty(i) && zy(n, t, r[i], o);
          }
        return n;
      }
      function zy(e, t, n, r) {
        e.hasOwnProperty(n) ? e[n].push(t, r) : (e[n] = [t, r]);
      }
      function yt(e, t, n, r, i, o, s, a) {
        const c = ot(t, n);
        let u,
          l = t.inputs;
        !a && null != l && (u = l[r])
          ? (vd(e, n, u, r, i),
            sr(t) &&
              (function IA(e, t) {
                const n = ht(t, e);
                16 & n[V] || (n[V] |= 64);
              })(n, t.index))
          : 3 & t.type &&
            ((r = (function MA(e) {
              return "class" === e
                ? "className"
                : "for" === e
                ? "htmlFor"
                : "formaction" === e
                ? "formAction"
                : "innerHtml" === e
                ? "innerHTML"
                : "readonly" === e
                ? "readOnly"
                : "tabindex" === e
                ? "tabIndex"
                : e;
            })(r)),
            (i = null != s ? s(i, t.value || "", r) : i),
            o.setProperty(c, r, i));
      }
      function gd(e, t, n, r) {
        if (Ng()) {
          const i = null === r ? null : { "": -1 },
            o = (function RA(e, t) {
              const n = e.directiveRegistry;
              let r = null,
                i = null;
              if (n)
                for (let o = 0; o < n.length; o++) {
                  const s = n[o];
                  if (Qp(t, s.selectors, !1))
                    if ((r || (r = []), Ht(s)))
                      if (null !== s.findHostDirectiveDefs) {
                        const a = [];
                        (i = i || new Map()),
                          s.findHostDirectiveDefs(s, a, i),
                          r.unshift(...a, s),
                          md(e, t, a.length);
                      } else r.unshift(s), md(e, t, 0);
                    else
                      (i = i || new Map()),
                        s.findHostDirectiveDefs?.(s, r, i),
                        r.push(s);
                }
              return null === r ? null : [r, i];
            })(e, n);
          let s, a;
          null === o ? (s = a = null) : ([s, a] = o),
            null !== s && qy(e, t, n, s, i, a),
            i &&
              (function xA(e, t, n) {
                if (t) {
                  const r = (e.localNames = []);
                  for (let i = 0; i < t.length; i += 2) {
                    const o = n[t[i + 1]];
                    if (null == o) throw new _(-301, !1);
                    r.push(t[i], o);
                  }
                }
              })(n, r, i);
        }
        n.mergedAttrs = Xi(n.mergedAttrs, n.attrs);
      }
      function qy(e, t, n, r, i, o) {
        for (let l = 0; l < r.length; l++) fu(Qs(n, t), e, r[l].type);
        !(function FA(e, t, n) {
          (e.flags |= 1),
            (e.directiveStart = t),
            (e.directiveEnd = t + n),
            (e.providerIndexes = t);
        })(n, e.data.length, r.length);
        for (let l = 0; l < r.length; l++) {
          const u = r[l];
          u.providersResolver && u.providersResolver(u);
        }
        let s = !1,
          a = !1,
          c = Ao(e, t, r.length, null);
        for (let l = 0; l < r.length; l++) {
          const u = r[l];
          (n.mergedAttrs = Xi(n.mergedAttrs, u.hostAttrs)),
            kA(e, n, t, c, u),
            PA(c, u, i),
            null !== u.contentQueries && (n.flags |= 4),
            (null !== u.hostBindings ||
              null !== u.hostAttrs ||
              0 !== u.hostVars) &&
              (n.flags |= 64);
          const d = u.type.prototype;
          !s &&
            (d.ngOnChanges || d.ngOnInit || d.ngDoCheck) &&
            ((e.preOrderHooks ??= []).push(n.index), (s = !0)),
            !a &&
              (d.ngOnChanges || d.ngDoCheck) &&
              ((e.preOrderCheckHooks ??= []).push(n.index), (a = !0)),
            c++;
        }
        !(function bA(e, t, n) {
          const i = t.directiveEnd,
            o = e.data,
            s = t.attrs,
            a = [];
          let c = null,
            l = null;
          for (let u = t.directiveStart; u < i; u++) {
            const d = o[u],
              f = n ? n.get(d) : null,
              p = f ? f.outputs : null;
            (c = Uy(d.inputs, u, c, f ? f.inputs : null)),
              (l = Uy(d.outputs, u, l, p));
            const g = null === c || null === s || Zp(t) ? null : BA(c, u, s);
            a.push(g);
          }
          null !== c &&
            (c.hasOwnProperty("class") && (t.flags |= 8),
            c.hasOwnProperty("style") && (t.flags |= 16)),
            (t.initialInputs = a),
            (t.inputs = c),
            (t.outputs = l);
        })(e, n, o);
      }
      function Gy(e, t, n) {
        const r = n.directiveStart,
          i = n.directiveEnd,
          o = n.index,
          s = (function _S() {
            return F.lFrame.currentDirectiveIndex;
          })();
        try {
          lr(o);
          for (let a = r; a < i; a++) {
            const c = e.data[a],
              l = t[a];
            nu(a),
              (null !== c.hostBindings ||
                0 !== c.hostVars ||
                null !== c.hostAttrs) &&
                NA(c, l);
          }
        } finally {
          lr(-1), nu(s);
        }
      }
      function NA(e, t) {
        null !== e.hostBindings && e.hostBindings(1, t);
      }
      function md(e, t, n) {
        (t.componentOffset = n), (e.components ??= []).push(t.index);
      }
      function PA(e, t, n) {
        if (n) {
          if (t.exportAs)
            for (let r = 0; r < t.exportAs.length; r++) n[t.exportAs[r]] = e;
          Ht(t) && (n[""] = e);
        }
      }
      function kA(e, t, n, r, i) {
        e.data[r] = i;
        const o = i.factory || (i.factory = ar(i.type)),
          s = new co(o, Ht(i), O);
        (e.blueprint[r] = s),
          (n[r] = s),
          (function TA(e, t, n, r, i) {
            const o = i.hostBindings;
            if (o) {
              let s = e.hostBindingOpCodes;
              null === s && (s = e.hostBindingOpCodes = []);
              const a = ~t.index;
              (function AA(e) {
                let t = e.length;
                for (; t > 0; ) {
                  const n = e[--t];
                  if ("number" == typeof n && n < 0) return n;
                }
                return 0;
              })(s) != a && s.push(a),
                s.push(n, r, o);
            }
          })(e, t, r, Ao(e, n, i.hostVars, H), i);
      }
      function an(e, t, n, r, i, o) {
        const s = ot(e, t);
        !(function yd(e, t, n, r, i, o, s) {
          if (null == o) e.removeAttribute(t, i, n);
          else {
            const a = null == s ? L(o) : s(o, r || "", i);
            e.setAttribute(t, i, a, n);
          }
        })(t[j], s, o, e.value, n, r, i);
      }
      function jA(e, t, n, r, i, o) {
        const s = o[t];
        if (null !== s)
          for (let a = 0; a < s.length; ) Wy(r, n, s[a++], s[a++], s[a++]);
      }
      function Wy(e, t, n, r, i) {
        const o = Tt(null);
        try {
          const s = e.inputTransforms;
          null !== s && s.hasOwnProperty(r) && (i = s[r].call(t, i)),
            null !== e.setInput ? e.setInput(t, i, n, r) : (t[r] = i);
        } finally {
          Tt(o);
        }
      }
      function BA(e, t, n) {
        let r = null,
          i = 0;
        for (; i < n.length; ) {
          const o = n[i];
          if (0 !== o)
            if (5 !== o) {
              if ("number" == typeof o) break;
              if (e.hasOwnProperty(o)) {
                null === r && (r = []);
                const s = e[o];
                for (let a = 0; a < s.length; a += 2)
                  if (s[a] === t) {
                    r.push(o, s[a + 1], n[i + 1]);
                    break;
                  }
              }
              i += 2;
            } else i += 2;
          else i += 4;
        }
        return r;
      }
      function Ky(e, t, n, r) {
        return [e, !0, !1, t, null, 0, r, n, null, null, null];
      }
      function Zy(e, t) {
        const n = e.contentQueries;
        if (null !== n)
          for (let r = 0; r < n.length; r += 2) {
            const o = n[r + 1];
            if (-1 !== o) {
              const s = e.data[o];
              iu(n[r]), s.contentQueries(2, t[o], o);
            }
          }
      }
      function Ra(e, t) {
        return e[eo] ? (e[tg][Bt] = t) : (e[eo] = t), (e[tg] = t), t;
      }
      function _d(e, t, n) {
        iu(0);
        const r = Tt(null);
        try {
          t(e, n);
        } finally {
          Tt(r);
        }
      }
      function Qy(e) {
        return e[Br] || (e[Br] = []);
      }
      function Yy(e) {
        return e.cleanup || (e.cleanup = []);
      }
      function Jy(e, t) {
        const n = e[jn],
          r = n ? n.get(Nt, null) : null;
        r && r.handleError(t);
      }
      function vd(e, t, n, r, i) {
        for (let o = 0; o < n.length; ) {
          const s = n[o++],
            a = n[o++];
          Wy(e.data[s], t[s], r, a, i);
        }
      }
      function HA(e, t) {
        const n = ht(t, e),
          r = n[w];
        !(function VA(e, t) {
          for (let n = t.length; n < e.blueprint.length; n++)
            t.push(e.blueprint[n]);
        })(r, n);
        const i = n[me];
        null !== i && null === n[Dn] && (n[Dn] = Ju(i, n[jn])), Dd(r, n, n[Ee]);
      }
      function Dd(e, t, n) {
        ou(t);
        try {
          const r = e.viewQuery;
          null !== r && _d(1, r, n);
          const i = e.template;
          null !== i && Hy(e, t, i, 1, n),
            e.firstCreatePass && (e.firstCreatePass = !1),
            e.staticContentQueries && Zy(e, t),
            e.staticViewQueries && _d(2, e.viewQuery, n);
          const o = e.components;
          null !== o &&
            (function $A(e, t) {
              for (let n = 0; n < t.length; n++) HA(e, t[n]);
            })(t, o);
        } catch (r) {
          throw (
            (e.firstCreatePass &&
              ((e.incompleteFirstPass = !0), (e.firstCreatePass = !1)),
            r)
          );
        } finally {
          (t[V] &= -5), su();
        }
      }
      let e_ = (() => {
        class e {
          constructor() {
            (this.all = new Set()), (this.queue = new Map());
          }
          create(n, r, i) {
            const o = typeof Zone > "u" ? null : Zone.current,
              s = (function GI(e, t, n) {
                const r = Object.create(WI);
                n && (r.consumerAllowSignalWrites = !0),
                  (r.fn = e),
                  (r.schedule = t);
                const i = (s) => {
                  r.cleanupFn = s;
                };
                return (
                  (r.ref = {
                    notify: () => ug(r),
                    run: () => {
                      if (((r.dirty = !1), r.hasRun && !dg(r))) return;
                      r.hasRun = !0;
                      const s = Kl(r);
                      try {
                        r.cleanupFn(), (r.cleanupFn = vg), r.fn(i);
                      } finally {
                        Zl(r, s);
                      }
                    },
                    cleanup: () => r.cleanupFn(),
                  }),
                  r.ref
                );
              })(
                n,
                (l) => {
                  this.all.has(l) && this.queue.set(l, o);
                },
                i
              );
            let a;
            this.all.add(s), s.notify();
            const c = () => {
              s.cleanup(), a?.(), this.all.delete(s), this.queue.delete(s);
            };
            return (a = r?.onDestroy(c)), { destroy: c };
          }
          flush() {
            if (0 !== this.queue.size)
              for (const [n, r] of this.queue)
                this.queue.delete(n), r ? r.run(() => n.run()) : n.run();
          }
          get isQueueEmpty() {
            return 0 === this.queue.size;
          }
          static #e = (this.ɵprov = T({
            token: e,
            providedIn: "root",
            factory: () => new e(),
          }));
        }
        return e;
      })();
      function xa(e, t, n) {
        let r = n ? e.styles : null,
          i = n ? e.classes : null,
          o = 0;
        if (null !== t)
          for (let s = 0; s < t.length; s++) {
            const a = t[s];
            "number" == typeof a
              ? (o = a)
              : 1 == o
              ? (i = Tl(i, a))
              : 2 == o && (r = Tl(r, a + ": " + t[++s] + ";"));
          }
        n ? (e.styles = r) : (e.stylesWithoutHost = r),
          n ? (e.classes = i) : (e.classesWithoutHost = i);
      }
      function Oo(e, t, n, r, i = !1) {
        for (; null !== n; ) {
          const o = t[n.index];
          null !== o && r.push(le(o)), Ge(o) && t_(o, r);
          const s = n.type;
          if (8 & s) Oo(e, t, n.child, r);
          else if (32 & s) {
            const a = bu(n, t);
            let c;
            for (; (c = a()); ) r.push(c);
          } else if (16 & s) {
            const a = Lm(t, n);
            if (Array.isArray(a)) r.push(...a);
            else {
              const c = vo(t[Ce]);
              Oo(c[w], c, a, r, !0);
            }
          }
          n = i ? n.projectionNext : n.next;
        }
        return r;
      }
      function t_(e, t) {
        for (let n = Pe; n < e.length; n++) {
          const r = e[n],
            i = r[w].firstChild;
          null !== i && Oo(r[w], r, i, t);
        }
        e[Jt] !== e[me] && t.push(e[Jt]);
      }
      function Pa(e, t, n, r = !0) {
        const i = t[Hr],
          o = i.rendererFactory,
          s = i.afterRenderEventManager;
        o.begin?.(), s?.begin();
        try {
          n_(e, t, e.template, n);
        } catch (c) {
          throw (r && Jy(t, c), c);
        } finally {
          o.end?.(), i.effectManager?.flush(), s?.end();
        }
      }
      function n_(e, t, n, r) {
        const i = t[V];
        if (256 != (256 & i)) {
          t[Hr].effectManager?.flush(), ou(t);
          try {
            Ig(t),
              (function Pg(e) {
                return (F.lFrame.bindingIndex = e);
              })(e.bindingStartIndex),
              null !== n && Hy(e, t, n, 2, r);
            const s = 3 == (3 & i);
            if (s) {
              const l = e.preOrderCheckHooks;
              null !== l && Ws(t, l, null);
            } else {
              const l = e.preOrderHooks;
              null !== l && Ks(t, l, 0, null), au(t, 0);
            }
            if (
              ((function qA(e) {
                for (let t = Mm(e); null !== t; t = Im(t)) {
                  if (!t[rg]) continue;
                  const n = t[Ur];
                  for (let r = 0; r < n.length; r++) {
                    rS(n[r]);
                  }
                }
              })(t),
              r_(t, 2),
              null !== e.contentQueries && Zy(e, t),
              s)
            ) {
              const l = e.contentCheckHooks;
              null !== l && Ws(t, l);
            } else {
              const l = e.contentHooks;
              null !== l && Ks(t, l, 1), au(t, 1);
            }
            !(function mA(e, t) {
              const n = e.hostBindingOpCodes;
              if (null === n) return;
              const r = Py(t, io);
              try {
                for (let i = 0; i < n.length; i++) {
                  const o = n[i];
                  if (o < 0) lr(~o);
                  else {
                    const s = o,
                      a = n[++i],
                      c = n[++i];
                    yS(a, s), (r.dirty = !1);
                    const l = Kl(r);
                    try {
                      c(2, t[s]);
                    } finally {
                      Zl(r, l);
                    }
                  }
                }
              } finally {
                null === t[io] && Fy(t, io), lr(-1);
              }
            })(e, t);
            const a = e.components;
            null !== a && o_(t, a, 0);
            const c = e.viewQuery;
            if ((null !== c && _d(2, c, r), s)) {
              const l = e.viewCheckHooks;
              null !== l && Ws(t, l);
            } else {
              const l = e.viewHooks;
              null !== l && Ks(t, l, 2), au(t, 2);
            }
            !0 === e.firstUpdatePass && (e.firstUpdatePass = !1),
              (t[V] &= -73),
              Sg(t);
          } finally {
            su();
          }
        }
      }
      function r_(e, t) {
        for (let n = Mm(e); null !== n; n = Im(n))
          for (let r = Pe; r < n.length; r++) i_(n[r], t);
      }
      function GA(e, t, n) {
        i_(ht(t, e), n);
      }
      function i_(e, t) {
        if (
          !(function tS(e) {
            return 128 == (128 & e[V]);
          })(e)
        )
          return;
        const n = e[w],
          r = e[V];
        if ((80 & r && 0 === t) || 1024 & r || 2 === t)
          n_(n, e, n.template, e[Ee]);
        else if (e[Ji] > 0) {
          r_(e, 1);
          const i = n.components;
          null !== i && o_(e, i, 1);
        }
      }
      function o_(e, t, n) {
        for (let r = 0; r < t.length; r++) GA(e, t[r], n);
      }
      class No {
        get rootNodes() {
          const t = this._lView,
            n = t[w];
          return Oo(n, t, n.firstChild, []);
        }
        constructor(t, n) {
          (this._lView = t),
            (this._cdRefInjectingView = n),
            (this._appRef = null),
            (this._attachedToViewContainer = !1);
        }
        get context() {
          return this._lView[Ee];
        }
        set context(t) {
          this._lView[Ee] = t;
        }
        get destroyed() {
          return 256 == (256 & this._lView[V]);
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this);
          else if (this._attachedToViewContainer) {
            const t = this._lView[he];
            if (Ge(t)) {
              const n = t[8],
                r = n ? n.indexOf(this) : -1;
              r > -1 && (la(t, r), Js(n, r));
            }
            this._attachedToViewContainer = !1;
          }
          Iu(this._lView[w], this._lView);
        }
        onDestroy(t) {
          !(function Ag(e, t) {
            if (256 == (256 & e[V])) throw new _(911, !1);
            null === e[Bn] && (e[Bn] = []), e[Bn].push(t);
          })(this._lView, t);
        }
        markForCheck() {
          To(this._cdRefInjectingView || this._lView);
        }
        detach() {
          this._lView[V] &= -129;
        }
        reattach() {
          this._lView[V] |= 128;
        }
        detectChanges() {
          Pa(this._lView[w], this._lView, this.context);
        }
        checkNoChanges() {}
        attachToViewContainerRef() {
          if (this._appRef) throw new _(902, !1);
          this._attachedToViewContainer = !0;
        }
        detachFromAppRef() {
          (this._appRef = null),
            (function R0(e, t) {
              Eo(e, t, t[j], 2, null, null);
            })(this._lView[w], this._lView);
        }
        attachToAppRef(t) {
          if (this._attachedToViewContainer) throw new _(902, !1);
          this._appRef = t;
        }
      }
      class WA extends No {
        constructor(t) {
          super(t), (this._view = t);
        }
        detectChanges() {
          const t = this._view;
          Pa(t[w], t, t[Ee], !1);
        }
        checkNoChanges() {}
        get context() {
          return null;
        }
      }
      class s_ extends Sa {
        constructor(t) {
          super(), (this.ngModule = t);
        }
        resolveComponentFactory(t) {
          const n = G(t);
          return new Ro(n, this.ngModule);
        }
      }
      function a_(e) {
        const t = [];
        for (let n in e)
          e.hasOwnProperty(n) && t.push({ propName: e[n], templateName: n });
        return t;
      }
      class ZA {
        constructor(t, n) {
          (this.injector = t), (this.parentInjector = n);
        }
        get(t, n, r) {
          r = ks(r);
          const i = this.injector.get(t, nd, r);
          return i !== nd || n === nd ? i : this.parentInjector.get(t, n, r);
        }
      }
      class Ro extends hy {
        get inputs() {
          const t = this.componentDef,
            n = t.inputTransforms,
            r = a_(t.inputs);
          if (null !== n)
            for (const i of r)
              n.hasOwnProperty(i.propName) && (i.transform = n[i.propName]);
          return r;
        }
        get outputs() {
          return a_(this.componentDef.outputs);
        }
        constructor(t, n) {
          super(),
            (this.componentDef = t),
            (this.ngModule = n),
            (this.componentType = t.type),
            (this.selector = (function SI(e) {
              return e.map(II).join(",");
            })(t.selectors)),
            (this.ngContentSelectors = t.ngContentSelectors
              ? t.ngContentSelectors
              : []),
            (this.isBoundToModule = !!n);
        }
        create(t, n, r, i) {
          let o = (i = i || this.ngModule) instanceof Ot ? i : i?.injector;
          o &&
            null !== this.componentDef.getStandaloneInjector &&
            (o = this.componentDef.getStandaloneInjector(o) || o);
          const s = o ? new ZA(t, o) : t,
            a = s.get(So, null);
          if (null === a) throw new _(407, !1);
          const d = {
              rendererFactory: a,
              sanitizer: s.get(qT, null),
              effectManager: s.get(e_, null),
              afterRenderEventManager: s.get(ld, null),
            },
            f = a.createRenderer(null, this.componentDef),
            h = this.componentDef.selectors[0][0] || "div",
            p = r
              ? (function _A(e, t, n, r) {
                  const o = r.get(Oy, !1) || n === St.ShadowDom,
                    s = e.selectRootElement(t, o);
                  return (
                    (function vA(e) {
                      $y(e);
                    })(s),
                    s
                  );
                })(f, r, this.componentDef.encapsulation, s)
              : ca(
                  f,
                  h,
                  (function KA(e) {
                    const t = e.toLowerCase();
                    return "svg" === t ? "svg" : "math" === t ? "math" : null;
                  })(h)
                ),
            v = this.componentDef.signals
              ? 4608
              : this.componentDef.onPush
              ? 576
              : 528;
          let m = null;
          null !== p && (m = Ju(p, s, !0));
          const b = pd(0, null, null, 1, 0, null, null, null, null, null, null),
            I = Na(null, b, null, v, null, null, d, f, s, null, m);
          let B, ie;
          ou(I);
          try {
            const fe = this.componentDef;
            let je,
              Ct = null;
            fe.findHostDirectiveDefs
              ? ((je = []),
                (Ct = new Map()),
                fe.findHostDirectiveDefs(fe, je, Ct),
                je.push(fe))
              : (je = [fe]);
            const Kt = (function YA(e, t) {
                const n = e[w],
                  r = q;
                return (e[r] = t), gi(n, r, 2, "#host", null);
              })(I, p),
              hl = (function XA(e, t, n, r, i, o, s) {
                const a = i[w];
                !(function JA(e, t, n, r) {
                  for (const i of e)
                    t.mergedAttrs = Xi(t.mergedAttrs, i.hostAttrs);
                  null !== t.mergedAttrs &&
                    (xa(t, t.mergedAttrs, !0), null !== n && Vm(r, n, t));
                })(r, e, t, s);
                let c = null;
                null !== t && (c = Ju(t, i[jn]));
                const l = o.rendererFactory.createRenderer(t, n);
                let u = 16;
                n.signals ? (u = 4096) : n.onPush && (u = 64);
                const d = Na(
                  i,
                  Vy(n),
                  null,
                  u,
                  i[e.index],
                  e,
                  o,
                  l,
                  null,
                  null,
                  c
                );
                return (
                  a.firstCreatePass && md(a, e, r.length - 1),
                  Ra(i, d),
                  (i[e.index] = d)
                );
              })(Kt, p, fe, je, I, d, f);
            (ie = Mg(b, q)),
              p &&
                (function tO(e, t, n, r) {
                  if (r) Ul(e, n, ["ng-version", GT.full]);
                  else {
                    const { attrs: i, classes: o } = (function TI(e) {
                      const t = [],
                        n = [];
                      let r = 1,
                        i = 2;
                      for (; r < e.length; ) {
                        let o = e[r];
                        if ("string" == typeof o)
                          2 === i
                            ? "" !== o && t.push(o, e[++r])
                            : 8 === i && n.push(o);
                        else {
                          if (!jt(i)) break;
                          i = o;
                        }
                        r++;
                      }
                      return { attrs: t, classes: n };
                    })(t.selectors[0]);
                    i && Ul(e, n, i),
                      o && o.length > 0 && Hm(e, n, o.join(" "));
                  }
                })(f, fe, p, r),
              void 0 !== n &&
                (function nO(e, t, n) {
                  const r = (e.projection = []);
                  for (let i = 0; i < t.length; i++) {
                    const o = n[i];
                    r.push(null != o ? Array.from(o) : null);
                  }
                })(ie, this.ngContentSelectors, n),
              (B = (function eO(e, t, n, r, i, o) {
                const s = ke(),
                  a = i[w],
                  c = ot(s, i);
                qy(a, i, s, n, null, r);
                for (let u = 0; u < n.length; u++)
                  He(ur(i, a, s.directiveStart + u, s), i);
                Gy(a, i, s), c && He(c, i);
                const l = ur(i, a, s.directiveStart + s.componentOffset, s);
                if (((e[Ee] = i[Ee] = l), null !== o))
                  for (const u of o) u(l, t);
                return dd(a, s, e), l;
              })(hl, fe, je, Ct, I, [rO])),
              Dd(b, I, null);
          } finally {
            su();
          }
          return new QA(this.componentType, B, di(ie, I), I, ie);
        }
      }
      class QA extends BT {
        constructor(t, n, r, i, o) {
          super(),
            (this.location = r),
            (this._rootLView = i),
            (this._tNode = o),
            (this.previousInputValues = null),
            (this.instance = n),
            (this.hostView = this.changeDetectorRef = new WA(i)),
            (this.componentType = t);
        }
        setInput(t, n) {
          const r = this._tNode.inputs;
          let i;
          if (null !== r && (i = r[t])) {
            if (
              ((this.previousInputValues ??= new Map()),
              this.previousInputValues.has(t) &&
                Object.is(this.previousInputValues.get(t), n))
            )
              return;
            const o = this._rootLView;
            vd(o[w], o, i, t, n),
              this.previousInputValues.set(t, n),
              To(ht(this._tNode.index, o));
          }
        }
        get injector() {
          return new Ze(this._tNode, this._rootLView);
        }
        destroy() {
          this.hostView.destroy();
        }
        onDestroy(t) {
          this.hostView.onDestroy(t);
        }
      }
      function rO() {
        const e = ke();
        Gs(D()[w], e);
      }
      function Ed(e) {
        let t = (function c_(e) {
            return Object.getPrototypeOf(e.prototype).constructor;
          })(e.type),
          n = !0;
        const r = [e];
        for (; t; ) {
          let i;
          if (Ht(e)) i = t.ɵcmp || t.ɵdir;
          else {
            if (t.ɵcmp) throw new _(903, !1);
            i = t.ɵdir;
          }
          if (i) {
            if (n) {
              r.push(i);
              const s = e;
              (s.inputs = Fa(e.inputs)),
                (s.inputTransforms = Fa(e.inputTransforms)),
                (s.declaredInputs = Fa(e.declaredInputs)),
                (s.outputs = Fa(e.outputs));
              const a = i.hostBindings;
              a && aO(e, a);
              const c = i.viewQuery,
                l = i.contentQueries;
              if (
                (c && oO(e, c),
                l && sO(e, l),
                Os(e.inputs, i.inputs),
                Os(e.declaredInputs, i.declaredInputs),
                Os(e.outputs, i.outputs),
                null !== i.inputTransforms &&
                  (null === s.inputTransforms && (s.inputTransforms = {}),
                  Os(s.inputTransforms, i.inputTransforms)),
                Ht(i) && i.data.animation)
              ) {
                const u = e.data;
                u.animation = (u.animation || []).concat(i.data.animation);
              }
            }
            const o = i.features;
            if (o)
              for (let s = 0; s < o.length; s++) {
                const a = o[s];
                a && a.ngInherit && a(e), a === Ed && (n = !1);
              }
          }
          t = Object.getPrototypeOf(t);
        }
        !(function iO(e) {
          let t = 0,
            n = null;
          for (let r = e.length - 1; r >= 0; r--) {
            const i = e[r];
            (i.hostVars = t += i.hostVars),
              (i.hostAttrs = Xi(i.hostAttrs, (n = Xi(n, i.hostAttrs))));
          }
        })(r);
      }
      function Fa(e) {
        return e === Yt ? {} : e === Q ? [] : e;
      }
      function oO(e, t) {
        const n = e.viewQuery;
        e.viewQuery = n
          ? (r, i) => {
              t(r, i), n(r, i);
            }
          : t;
      }
      function sO(e, t) {
        const n = e.contentQueries;
        e.contentQueries = n
          ? (r, i, o) => {
              t(r, i, o), n(r, i, o);
            }
          : t;
      }
      function aO(e, t) {
        const n = e.hostBindings;
        e.hostBindings = n
          ? (r, i) => {
              t(r, i), n(r, i);
            }
          : t;
      }
      function f_(e) {
        const t = e.inputConfig,
          n = {};
        for (const r in t)
          if (t.hasOwnProperty(r)) {
            const i = t[r];
            Array.isArray(i) && i[2] && (n[r] = i[2]);
          }
        e.inputTransforms = n;
      }
      function ka(e) {
        return (
          !!(function Cd(e) {
            return (
              null !== e && ("function" == typeof e || "object" == typeof e)
            );
          })(e) &&
          (Array.isArray(e) || (!(e instanceof Map) && Symbol.iterator in e))
        );
      }
      function Ve(e, t, n) {
        return !Object.is(e[t], n) && ((e[t] = n), !0);
      }
      function ja(e, t, n, r) {
        const i = D();
        return Ve(i, Wr(), t) && (W(), an(pe(), i, e, t, n, r)), ja;
      }
      function yi(e, t, n, r) {
        return Ve(e, Wr(), n) ? t + L(n) + r : H;
      }
      function Lo(e, t, n, r, i, o, s, a) {
        const c = D(),
          l = W(),
          u = e + q,
          d = l.firstCreatePass
            ? (function RO(e, t, n, r, i, o, s, a, c) {
                const l = t.consts,
                  u = gi(t, e, 4, s || null, Vn(l, a));
                gd(t, n, u, Vn(l, c)), Gs(t, u);
                const d = (u.tView = pd(
                  2,
                  u,
                  r,
                  i,
                  o,
                  t.directiveRegistry,
                  t.pipeRegistry,
                  null,
                  t.schemas,
                  l,
                  null
                ));
                return (
                  null !== t.queries &&
                    (t.queries.template(t, u),
                    (d.queries = t.queries.embeddedTView(u))),
                  u
                );
              })(u, l, c, t, n, r, i, o, s)
            : l.data[u];
        tn(d, !1);
        const f = M_(l, c, d, e);
        qs() && da(l, c, f, d),
          He(f, c),
          Ra(c, (c[u] = Ky(f, c, f, d))),
          Vs(d) && fd(l, c, d),
          null != s && hd(c, d, a);
      }
      let M_ = function I_(e, t, n, r) {
        return $n(!0), t[j].createComment("");
      };
      function Mi(e, t, n) {
        const r = D();
        return Ve(r, Wr(), t) && yt(W(), pe(), r, e, t, r[j], n, !1), Mi;
      }
      function Td(e, t, n, r, i) {
        const s = i ? "class" : "style";
        vd(e, n, t.inputs[s], s, r);
      }
      function oe(e, t, n, r) {
        const i = D(),
          o = W(),
          s = q + e,
          a = i[j],
          c = o.firstCreatePass
            ? (function LO(e, t, n, r, i, o) {
                const s = t.consts,
                  c = gi(t, e, 2, r, Vn(s, i));
                return (
                  gd(t, n, c, Vn(s, o)),
                  null !== c.attrs && xa(c, c.attrs, !1),
                  null !== c.mergedAttrs && xa(c, c.mergedAttrs, !0),
                  null !== t.queries && t.queries.elementStart(t, c),
                  c
                );
              })(s, o, i, t, n, r)
            : o.data[s],
          l = S_(o, i, c, a, t, e);
        i[s] = l;
        const u = Vs(c);
        return (
          tn(c, !0),
          Vm(a, l, c),
          32 != (32 & c.flags) && qs() && da(o, i, l, c),
          0 ===
            (function oS() {
              return F.lFrame.elementDepthCount;
            })() && He(l, i),
          (function sS() {
            F.lFrame.elementDepthCount++;
          })(),
          u && (fd(o, i, c), dd(o, c, i)),
          null !== r && hd(i, c),
          oe
        );
      }
      function se() {
        let e = ke();
        eu() ? tu() : ((e = e.parent), tn(e, !1));
        const t = e;
        (function cS(e) {
          return F.skipHydrationRootTNode === e;
        })(t) &&
          (function fS() {
            F.skipHydrationRootTNode = null;
          })(),
          (function aS() {
            F.lFrame.elementDepthCount--;
          })();
        const n = W();
        return (
          n.firstCreatePass && (Gs(n, e), ql(e) && n.queries.elementEnd(e)),
          null != t.classesWithoutHost &&
            (function AS(e) {
              return 0 != (8 & e.flags);
            })(t) &&
            Td(n, t, D(), t.classesWithoutHost, !0),
          null != t.stylesWithoutHost &&
            (function OS(e) {
              return 0 != (16 & e.flags);
            })(t) &&
            Td(n, t, D(), t.stylesWithoutHost, !1),
          se
        );
      }
      function _t(e, t, n, r) {
        return oe(e, t, n, r), se(), _t;
      }
      let S_ = (e, t, n, r, i, o) => (
        $n(!0),
        ca(
          r,
          i,
          (function $g() {
            return F.lFrame.currentNamespace;
          })()
        )
      );
      function $a(e) {
        return !!e && "function" == typeof e.then;
      }
      function O_(e) {
        return !!e && "function" == typeof e.subscribe;
      }
      function Ua(e, t, n, r) {
        const i = D(),
          o = W(),
          s = ke();
        return (
          (function R_(e, t, n, r, i, o, s) {
            const a = Vs(r),
              l = e.firstCreatePass && Yy(e),
              u = t[Ee],
              d = Qy(t);
            let f = !0;
            if (3 & r.type || s) {
              const g = ot(r, t),
                y = s ? s(g) : g,
                v = d.length,
                m = s ? (I) => s(le(I[r.index])) : r.index;
              let b = null;
              if (
                (!s &&
                  a &&
                  (b = (function zO(e, t, n, r) {
                    const i = e.cleanup;
                    if (null != i)
                      for (let o = 0; o < i.length - 1; o += 2) {
                        const s = i[o];
                        if (s === n && i[o + 1] === r) {
                          const a = t[Br],
                            c = i[o + 2];
                          return a.length > c ? a[c] : null;
                        }
                        "string" == typeof s && (o += 2);
                      }
                    return null;
                  })(e, t, i, r.index)),
                null !== b)
              )
                ((b.__ngLastListenerFn__ || b).__ngNextListenerFn__ = o),
                  (b.__ngLastListenerFn__ = o),
                  (f = !1);
              else {
                o = P_(r, t, u, o, !1);
                const I = n.listen(y, i, o);
                d.push(o, I), l && l.push(i, m, v, v + 1);
              }
            } else o = P_(r, t, u, o, !1);
            const h = r.outputs;
            let p;
            if (f && null !== h && (p = h[i])) {
              const g = p.length;
              if (g)
                for (let y = 0; y < g; y += 2) {
                  const B = t[p[y]][p[y + 1]].subscribe(o),
                    ie = d.length;
                  d.push(o, B), l && l.push(i, r.index, ie, -(ie + 1));
                }
            }
          })(o, i, i[j], s, e, t, r),
          Ua
        );
      }
      function x_(e, t, n, r) {
        try {
          return en(6, t, n), !1 !== n(r);
        } catch (i) {
          return Jy(e, i), !1;
        } finally {
          en(7, t, n);
        }
      }
      function P_(e, t, n, r, i) {
        return function o(s) {
          if (s === Function) return r;
          To(e.componentOffset > -1 ? ht(e.index, t) : t);
          let c = x_(t, n, r, s),
            l = o.__ngNextListenerFn__;
          for (; l; ) (c = x_(t, n, l, s) && c), (l = l.__ngNextListenerFn__);
          return i && !1 === c && s.preventDefault(), c;
        };
      }
      function F_(e = 1) {
        return (function DS(e) {
          return (F.lFrame.contextLView = (function ES(e, t) {
            for (; e > 0; ) (t = t[Vr]), e--;
            return t;
          })(e, F.lFrame.contextLView))[Ee];
        })(e);
      }
      function qO(e, t) {
        let n = null;
        const r = (function CI(e) {
          const t = e.attrs;
          if (null != t) {
            const n = t.indexOf(5);
            if (!(1 & n)) return t[n + 1];
          }
          return null;
        })(e);
        for (let i = 0; i < t.length; i++) {
          const o = t[i];
          if ("*" !== o) {
            if (null === r ? Qp(e, o, !0) : MI(r, o)) return i;
          } else n = i;
        }
        return n;
      }
      function za(e, t, n) {
        return Nd(e, "", t, "", n), za;
      }
      function Nd(e, t, n, r, i) {
        const o = D(),
          s = yi(o, t, n, r);
        return s !== H && yt(W(), pe(), o, e, s, o[j], i, !1), Nd;
      }
      function qa(e, t) {
        return (e << 17) | (t << 2);
      }
      function zn(e) {
        return (e >> 17) & 32767;
      }
      function Rd(e) {
        return 2 | e;
      }
      function yr(e) {
        return (131068 & e) >> 2;
      }
      function xd(e, t) {
        return (-131069 & e) | (t << 2);
      }
      function Pd(e) {
        return 1 | e;
      }
      function G_(e, t, n, r, i) {
        const o = e[n + 1],
          s = null === t;
        let a = r ? zn(o) : yr(o),
          c = !1;
        for (; 0 !== a && (!1 === c || s); ) {
          const u = e[a + 1];
          YO(e[a], t) && ((c = !0), (e[a + 1] = r ? Pd(u) : Rd(u))),
            (a = r ? zn(u) : yr(u));
        }
        c && (e[n + 1] = r ? Rd(o) : Pd(o));
      }
      function YO(e, t) {
        return (
          null === e ||
          null == t ||
          (Array.isArray(e) ? e[1] : e) === t ||
          (!(!Array.isArray(e) || "string" != typeof t) && ti(e, t) >= 0)
        );
      }
      function Fd(e, t) {
        return (
          (function Vt(e, t, n, r) {
            const i = D(),
              o = W(),
              s = (function Cn(e) {
                const t = F.lFrame,
                  n = t.bindingIndex;
                return (t.bindingIndex = t.bindingIndex + e), n;
              })(2);
            o.firstUpdatePass &&
              (function tv(e, t, n, r) {
                const i = e.data;
                if (null === i[n + 1]) {
                  const o = i[Ke()],
                    s = (function ev(e, t) {
                      return t >= e.expandoStartIndex;
                    })(e, n);
                  (function ov(e, t) {
                    return 0 != (e.flags & (t ? 8 : 16));
                  })(o, r) &&
                    null === t &&
                    !s &&
                    (t = !1),
                    (t = (function sN(e, t, n, r) {
                      const i = (function ru(e) {
                        const t = F.lFrame.currentDirectiveIndex;
                        return -1 === t ? null : e[t];
                      })(e);
                      let o = r ? t.residualClasses : t.residualStyles;
                      if (null === i)
                        0 === (r ? t.classBindings : t.styleBindings) &&
                          ((n = jo((n = kd(null, e, t, n, r)), t.attrs, r)),
                          (o = null));
                      else {
                        const s = t.directiveStylingLast;
                        if (-1 === s || e[s] !== i)
                          if (((n = kd(i, e, t, n, r)), null === o)) {
                            let c = (function aN(e, t, n) {
                              const r = n ? t.classBindings : t.styleBindings;
                              if (0 !== yr(r)) return e[zn(r)];
                            })(e, t, r);
                            void 0 !== c &&
                              Array.isArray(c) &&
                              ((c = kd(null, e, t, c[1], r)),
                              (c = jo(c, t.attrs, r)),
                              (function cN(e, t, n, r) {
                                e[zn(n ? t.classBindings : t.styleBindings)] =
                                  r;
                              })(e, t, r, c));
                          } else
                            o = (function lN(e, t, n) {
                              let r;
                              const i = t.directiveEnd;
                              for (
                                let o = 1 + t.directiveStylingLast;
                                o < i;
                                o++
                              )
                                r = jo(r, e[o].hostAttrs, n);
                              return jo(r, t.attrs, n);
                            })(e, t, r);
                      }
                      return (
                        void 0 !== o &&
                          (r
                            ? (t.residualClasses = o)
                            : (t.residualStyles = o)),
                        n
                      );
                    })(i, o, t, r)),
                    (function ZO(e, t, n, r, i, o) {
                      let s = o ? t.classBindings : t.styleBindings,
                        a = zn(s),
                        c = yr(s);
                      e[r] = n;
                      let u,
                        l = !1;
                      if (
                        (Array.isArray(n)
                          ? ((u = n[1]),
                            (null === u || ti(n, u) > 0) && (l = !0))
                          : (u = n),
                        i)
                      )
                        if (0 !== c) {
                          const f = zn(e[a + 1]);
                          (e[r + 1] = qa(f, a)),
                            0 !== f && (e[f + 1] = xd(e[f + 1], r)),
                            (e[a + 1] = (function WO(e, t) {
                              return (131071 & e) | (t << 17);
                            })(e[a + 1], r));
                        } else
                          (e[r + 1] = qa(a, 0)),
                            0 !== a && (e[a + 1] = xd(e[a + 1], r)),
                            (a = r);
                      else
                        (e[r + 1] = qa(c, 0)),
                          0 === a ? (a = r) : (e[c + 1] = xd(e[c + 1], r)),
                          (c = r);
                      l && (e[r + 1] = Rd(e[r + 1])),
                        G_(e, u, r, !0),
                        G_(e, u, r, !1),
                        (function QO(e, t, n, r, i) {
                          const o = i ? e.residualClasses : e.residualStyles;
                          null != o &&
                            "string" == typeof t &&
                            ti(o, t) >= 0 &&
                            (n[r + 1] = Pd(n[r + 1]));
                        })(t, u, e, r, o),
                        (s = qa(a, c)),
                        o ? (t.classBindings = s) : (t.styleBindings = s);
                    })(i, o, t, n, s, r);
                }
              })(o, e, s, r),
              t !== H &&
                Ve(i, s, t) &&
                (function rv(e, t, n, r, i, o, s, a) {
                  if (!(3 & t.type)) return;
                  const c = e.data,
                    l = c[a + 1],
                    u = (function KO(e) {
                      return 1 == (1 & e);
                    })(l)
                      ? iv(c, t, n, i, yr(l), s)
                      : void 0;
                  Ga(u) ||
                    (Ga(o) ||
                      ((function GO(e) {
                        return 2 == (2 & e);
                      })(l) &&
                        (o = iv(c, null, n, i, a, s))),
                    (function $0(e, t, n, r, i) {
                      if (t) i ? e.addClass(n, r) : e.removeClass(n, r);
                      else {
                        let o = -1 === r.indexOf("-") ? void 0 : Un.DashCase;
                        null == i
                          ? e.removeStyle(n, r, o)
                          : ("string" == typeof i &&
                              i.endsWith("!important") &&
                              ((i = i.slice(0, -10)), (o |= Un.Important)),
                            e.setStyle(n, r, i, o));
                      }
                    })(r, s, zs(Ke(), n), i, o));
                })(
                  o,
                  o.data[Ke()],
                  i,
                  i[j],
                  e,
                  (i[s + 1] = (function hN(e, t) {
                    return (
                      null == e ||
                        "" === e ||
                        ("string" == typeof t
                          ? (e += t)
                          : "object" == typeof e && (e = Ie(gt(e)))),
                      e
                    );
                  })(t, n)),
                  r,
                  s
                );
          })(e, t, null, !0),
          Fd
        );
      }
      function kd(e, t, n, r, i) {
        let o = null;
        const s = n.directiveEnd;
        let a = n.directiveStylingLast;
        for (
          -1 === a ? (a = n.directiveStart) : a++;
          a < s && ((o = t[a]), (r = jo(r, o.hostAttrs, i)), o !== e);

        )
          a++;
        return null !== e && (n.directiveStylingLast = a), r;
      }
      function jo(e, t, n) {
        const r = n ? 1 : 2;
        let i = -1;
        if (null !== t)
          for (let o = 0; o < t.length; o++) {
            const s = t[o];
            "number" == typeof s
              ? (i = s)
              : i === r &&
                (Array.isArray(e) || (e = void 0 === e ? [] : ["", e]),
                pt(e, s, !!n || t[++o]));
          }
        return void 0 === e ? null : e;
      }
      function iv(e, t, n, r, i, o) {
        const s = null === t;
        let a;
        for (; i > 0; ) {
          const c = e[i],
            l = Array.isArray(c),
            u = l ? c[1] : c,
            d = null === u;
          let f = n[i + 1];
          f === H && (f = d ? Q : void 0);
          let h = d ? gu(f, r) : u === r ? f : void 0;
          if ((l && !Ga(h) && (h = gu(c, r)), Ga(h) && ((a = h), s))) return a;
          const p = e[i + 1];
          i = s ? zn(p) : yr(p);
        }
        if (null !== t) {
          let c = o ? t.residualClasses : t.residualStyles;
          null != c && (a = gu(c, r));
        }
        return a;
      }
      function Ga(e) {
        return void 0 !== e;
      }
      function Ye(e, t = "") {
        const n = D(),
          r = W(),
          i = e + q,
          o = r.firstCreatePass ? gi(r, i, 1, t, null) : r.data[i],
          s = sv(r, n, o, t, e);
        (n[i] = s), qs() && da(r, n, s, o), tn(o, !1);
      }
      let sv = (e, t, n, r, i) => (
        $n(!0),
        (function aa(e, t) {
          return e.createText(t);
        })(t[j], r)
      );
      function Wa(e) {
        return Ka("", e, ""), Wa;
      }
      function Ka(e, t, n) {
        const r = D(),
          i = yi(r, e, t, n);
        return (
          i !== H &&
            (function Mn(e, t, n) {
              const r = zs(t, e);
              !(function Tm(e, t, n) {
                e.setValue(t, n);
              })(e[j], r, n);
            })(r, Ke(), i),
          Ka
        );
      }
      const Ti = "en-US";
      let Tv = Ti;
      class vr {}
      class eD {}
      class Ud extends vr {
        constructor(t, n, r) {
          super(),
            (this._parent = n),
            (this._bootstrapComponents = []),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new s_(this));
          const i = ft(t);
          (this._bootstrapComponents = bn(i.bootstrap)),
            (this._r3Injector = vy(
              t,
              n,
              [
                { provide: vr, useValue: this },
                { provide: Sa, useValue: this.componentFactoryResolver },
                ...r,
              ],
              Ie(t),
              new Set(["environment"])
            )),
            this._r3Injector.resolveInjectorInitializers(),
            (this.instance = this._r3Injector.get(t));
        }
        get injector() {
          return this._r3Injector;
        }
        destroy() {
          const t = this._r3Injector;
          !t.destroyed && t.destroy(),
            this.destroyCbs.forEach((n) => n()),
            (this.destroyCbs = null);
        }
        onDestroy(t) {
          this.destroyCbs.push(t);
        }
      }
      class zd extends eD {
        constructor(t) {
          super(), (this.moduleType = t);
        }
        create(t) {
          return new Ud(this.moduleType, t, []);
        }
      }
      class tD extends vr {
        constructor(t) {
          super(),
            (this.componentFactoryResolver = new s_(this)),
            (this.instance = null);
          const n = new ai(
            [
              ...t.providers,
              { provide: vr, useValue: this },
              { provide: Sa, useValue: this.componentFactoryResolver },
            ],
            t.parent || Da(),
            t.debugName,
            new Set(["environment"])
          );
          (this.injector = n),
            t.runEnvironmentInitializers && n.resolveInjectorInitializers();
        }
        destroy() {
          this.injector.destroy();
        }
        onDestroy(t) {
          this.injector.onDestroy(t);
        }
      }
      function qd(e, t, n = null) {
        return new tD({
          providers: e,
          parent: t,
          debugName: n,
          runEnvironmentInitializers: !0,
        }).injector;
      }
      let jR = (() => {
        class e {
          constructor(n) {
            (this._injector = n), (this.cachedInjectors = new Map());
          }
          getOrCreateStandaloneInjector(n) {
            if (!n.standalone) return null;
            if (!this.cachedInjectors.has(n)) {
              const r = ry(0, n.type),
                i =
                  r.length > 0
                    ? qd([r], this._injector, `Standalone[${n.type.name}]`)
                    : null;
              this.cachedInjectors.set(n, i);
            }
            return this.cachedInjectors.get(n);
          }
          ngOnDestroy() {
            try {
              for (const n of this.cachedInjectors.values())
                null !== n && n.destroy();
            } finally {
              this.cachedInjectors.clear();
            }
          }
          static #e = (this.ɵprov = T({
            token: e,
            providedIn: "environment",
            factory: () => new e(C(Ot)),
          }));
        }
        return e;
      })();
      function nD(e) {
        e.getStandaloneInjector = (t) =>
          t.get(jR).getOrCreateStandaloneInjector(e);
      }
      function ux() {
        return this._results[Symbol.iterator]();
      }
      class Wd {
        static #e = Symbol.iterator;
        get changes() {
          return this._changes || (this._changes = new Qe());
        }
        constructor(t = !1) {
          (this._emitDistinctChangesOnly = t),
            (this.dirty = !0),
            (this._results = []),
            (this._changesDetected = !1),
            (this._changes = null),
            (this.length = 0),
            (this.first = void 0),
            (this.last = void 0);
          const n = Wd.prototype;
          n[Symbol.iterator] || (n[Symbol.iterator] = ux);
        }
        get(t) {
          return this._results[t];
        }
        map(t) {
          return this._results.map(t);
        }
        filter(t) {
          return this._results.filter(t);
        }
        find(t) {
          return this._results.find(t);
        }
        reduce(t, n) {
          return this._results.reduce(t, n);
        }
        forEach(t) {
          this._results.forEach(t);
        }
        some(t) {
          return this._results.some(t);
        }
        toArray() {
          return this._results.slice();
        }
        toString() {
          return this._results.toString();
        }
        reset(t, n) {
          const r = this;
          r.dirty = !1;
          const i = (function At(e) {
            return e.flat(Number.POSITIVE_INFINITY);
          })(t);
          (this._changesDetected = !(function zS(e, t, n) {
            if (e.length !== t.length) return !1;
            for (let r = 0; r < e.length; r++) {
              let i = e[r],
                o = t[r];
              if ((n && ((i = n(i)), (o = n(o))), o !== i)) return !1;
            }
            return !0;
          })(r._results, i, n)) &&
            ((r._results = i),
            (r.length = i.length),
            (r.last = i[this.length - 1]),
            (r.first = i[0]));
        }
        notifyOnChanges() {
          this._changes &&
            (this._changesDetected || !this._emitDistinctChangesOnly) &&
            this._changes.emit(this);
        }
        setDirty() {
          this.dirty = !0;
        }
        destroy() {
          this.changes.complete(), this.changes.unsubscribe();
        }
      }
      function fx(e, t, n, r = !0) {
        const i = t[w];
        if (
          ((function P0(e, t, n, r) {
            const i = Pe + r,
              o = n.length;
            r > 0 && (n[i - 1][Bt] = t),
              r < o - Pe
                ? ((t[Bt] = n[i]), im(n, Pe + r, t))
                : (n.push(t), (t[Bt] = null)),
              (t[he] = n);
            const s = t[to];
            null !== s &&
              n !== s &&
              (function F0(e, t) {
                const n = e[Ur];
                t[Ce] !== t[he][he][Ce] && (e[rg] = !0),
                  null === n ? (e[Ur] = [t]) : n.push(t);
              })(s, t);
            const a = t[Xt];
            null !== a && a.insertView(e), (t[V] |= 128);
          })(i, t, e, n),
          r)
        ) {
          const o = Ou(n, e),
            s = t[j],
            a = ua(s, e[Jt]);
          null !== a &&
            (function N0(e, t, n, r, i, o) {
              (r[me] = i), (r[Be] = t), Eo(e, r, n, 1, i, o);
            })(i, e[Be], s, t, a, o);
        }
      }
      let In = (() => {
        class e {
          static #e = (this.__NG_ELEMENT_ID__ = gx);
        }
        return e;
      })();
      const hx = In,
        px = class extends hx {
          constructor(t, n, r) {
            super(),
              (this._declarationLView = t),
              (this._declarationTContainer = n),
              (this.elementRef = r);
          }
          get ssrId() {
            return this._declarationTContainer.tView?.ssrId || null;
          }
          createEmbeddedView(t, n) {
            return this.createEmbeddedViewImpl(t, n);
          }
          createEmbeddedViewImpl(t, n, r) {
            const i = (function dx(e, t, n, r) {
              const i = t.tView,
                a = Na(
                  e,
                  i,
                  n,
                  4096 & e[V] ? 4096 : 16,
                  null,
                  t,
                  null,
                  null,
                  null,
                  r?.injector ?? null,
                  r?.hydrationInfo ?? null
                );
              a[to] = e[t.index];
              const l = e[Xt];
              return (
                null !== l && (a[Xt] = l.createEmbeddedView(i)), Dd(i, a, n), a
              );
            })(this._declarationLView, this._declarationTContainer, t, {
              injector: n,
              hydrationInfo: r,
            });
            return new No(i);
          }
        };
      function gx() {
        return Ja(ke(), D());
      }
      function Ja(e, t) {
        return 4 & e.type ? new px(t, e, di(e, t)) : null;
      }
      let Ut = (() => {
        class e {
          static #e = (this.__NG_ELEMENT_ID__ = Ex);
        }
        return e;
      })();
      function Ex() {
        return DD(ke(), D());
      }
      const Cx = Ut,
        _D = class extends Cx {
          constructor(t, n, r) {
            super(),
              (this._lContainer = t),
              (this._hostTNode = n),
              (this._hostLView = r);
          }
          get element() {
            return di(this._hostTNode, this._hostLView);
          }
          get injector() {
            return new Ze(this._hostTNode, this._hostLView);
          }
          get parentInjector() {
            const t = Ys(this._hostTNode, this._hostLView);
            if (lu(t)) {
              const n = uo(t, this._hostLView),
                r = lo(t);
              return new Ze(n[w].data[r + 8], n);
            }
            return new Ze(null, this._hostLView);
          }
          clear() {
            for (; this.length > 0; ) this.remove(this.length - 1);
          }
          get(t) {
            const n = vD(this._lContainer);
            return (null !== n && n[t]) || null;
          }
          get length() {
            return this._lContainer.length - Pe;
          }
          createEmbeddedView(t, n, r) {
            let i, o;
            "number" == typeof r
              ? (i = r)
              : null != r && ((i = r.index), (o = r.injector));
            const a = t.createEmbeddedViewImpl(n || {}, o, null);
            return this.insertImpl(a, i, false), a;
          }
          createComponent(t, n, r, i, o) {
            const s =
              t &&
              !(function po(e) {
                return "function" == typeof e;
              })(t);
            let a;
            if (s) a = n;
            else {
              const g = n || {};
              (a = g.index),
                (r = g.injector),
                (i = g.projectableNodes),
                (o = g.environmentInjector || g.ngModuleRef);
            }
            const c = s ? t : new Ro(G(t)),
              l = r || this.parentInjector;
            if (!o && null == c.ngModule) {
              const y = (s ? l : this.parentInjector).get(Ot, null);
              y && (o = y);
            }
            G(c.componentType ?? {});
            const h = c.create(l, i, null, o);
            return this.insertImpl(h.hostView, a, false), h;
          }
          insert(t, n) {
            return this.insertImpl(t, n, !1);
          }
          insertImpl(t, n, r) {
            const i = t._lView;
            if (
              (function nS(e) {
                return Ge(e[he]);
              })(i)
            ) {
              const c = this.indexOf(t);
              if (-1 !== c) this.detach(c);
              else {
                const l = i[he],
                  u = new _D(l, l[Be], l[he]);
                u.detach(u.indexOf(t));
              }
            }
            const s = this._adjustIndex(n),
              a = this._lContainer;
            return (
              fx(a, i, s, !r), t.attachToViewContainerRef(), im(Kd(a), s, t), t
            );
          }
          move(t, n) {
            return this.insert(t, n);
          }
          indexOf(t) {
            const n = vD(this._lContainer);
            return null !== n ? n.indexOf(t) : -1;
          }
          remove(t) {
            const n = this._adjustIndex(t, -1),
              r = la(this._lContainer, n);
            r && (Js(Kd(this._lContainer), n), Iu(r[w], r));
          }
          detach(t) {
            const n = this._adjustIndex(t, -1),
              r = la(this._lContainer, n);
            return r && null != Js(Kd(this._lContainer), n) ? new No(r) : null;
          }
          _adjustIndex(t, n = 0) {
            return t ?? this.length + n;
          }
        };
      function vD(e) {
        return e[8];
      }
      function Kd(e) {
        return e[8] || (e[8] = []);
      }
      function DD(e, t) {
        let n;
        const r = t[e.index];
        return (
          Ge(r)
            ? (n = r)
            : ((n = Ky(r, t, null, e)), (t[e.index] = n), Ra(t, n)),
          ED(n, t, e, r),
          new _D(n, e, t)
        );
      }
      let ED = function CD(e, t, n, r) {
        if (e[Jt]) return;
        let i;
        (i =
          8 & n.type
            ? le(r)
            : (function wx(e, t) {
                const n = e[j],
                  r = n.createComment(""),
                  i = ot(t, e);
                return (
                  fr(
                    n,
                    ua(n, i),
                    r,
                    (function B0(e, t) {
                      return e.nextSibling(t);
                    })(n, i),
                    !1
                  ),
                  r
                );
              })(t, n)),
          (e[Jt] = i);
      };
      class Zd {
        constructor(t) {
          (this.queryList = t), (this.matches = null);
        }
        clone() {
          return new Zd(this.queryList);
        }
        setDirty() {
          this.queryList.setDirty();
        }
      }
      class Qd {
        constructor(t = []) {
          this.queries = t;
        }
        createEmbeddedView(t) {
          const n = t.queries;
          if (null !== n) {
            const r =
                null !== t.contentQueries ? t.contentQueries[0] : n.length,
              i = [];
            for (let o = 0; o < r; o++) {
              const s = n.getByIndex(o);
              i.push(this.queries[s.indexInDeclarationView].clone());
            }
            return new Qd(i);
          }
          return null;
        }
        insertView(t) {
          this.dirtyQueriesWithMatches(t);
        }
        detachView(t) {
          this.dirtyQueriesWithMatches(t);
        }
        dirtyQueriesWithMatches(t) {
          for (let n = 0; n < this.queries.length; n++)
            null !== AD(t, n).matches && this.queries[n].setDirty();
        }
      }
      class wD {
        constructor(t, n, r = null) {
          (this.predicate = t), (this.flags = n), (this.read = r);
        }
      }
      class Yd {
        constructor(t = []) {
          this.queries = t;
        }
        elementStart(t, n) {
          for (let r = 0; r < this.queries.length; r++)
            this.queries[r].elementStart(t, n);
        }
        elementEnd(t) {
          for (let n = 0; n < this.queries.length; n++)
            this.queries[n].elementEnd(t);
        }
        embeddedTView(t) {
          let n = null;
          for (let r = 0; r < this.length; r++) {
            const i = null !== n ? n.length : 0,
              o = this.getByIndex(r).embeddedTView(t, i);
            o &&
              ((o.indexInDeclarationView = r),
              null !== n ? n.push(o) : (n = [o]));
          }
          return null !== n ? new Yd(n) : null;
        }
        template(t, n) {
          for (let r = 0; r < this.queries.length; r++)
            this.queries[r].template(t, n);
        }
        getByIndex(t) {
          return this.queries[t];
        }
        get length() {
          return this.queries.length;
        }
        track(t) {
          this.queries.push(t);
        }
      }
      class Xd {
        constructor(t, n = -1) {
          (this.metadata = t),
            (this.matches = null),
            (this.indexInDeclarationView = -1),
            (this.crossesNgTemplate = !1),
            (this._appliesToNextNode = !0),
            (this._declarationNodeIndex = n);
        }
        elementStart(t, n) {
          this.isApplyingToNode(n) && this.matchTNode(t, n);
        }
        elementEnd(t) {
          this._declarationNodeIndex === t.index &&
            (this._appliesToNextNode = !1);
        }
        template(t, n) {
          this.elementStart(t, n);
        }
        embeddedTView(t, n) {
          return this.isApplyingToNode(t)
            ? ((this.crossesNgTemplate = !0),
              this.addMatch(-t.index, n),
              new Xd(this.metadata))
            : null;
        }
        isApplyingToNode(t) {
          if (this._appliesToNextNode && 1 != (1 & this.metadata.flags)) {
            const n = this._declarationNodeIndex;
            let r = t.parent;
            for (; null !== r && 8 & r.type && r.index !== n; ) r = r.parent;
            return n === (null !== r ? r.index : -1);
          }
          return this._appliesToNextNode;
        }
        matchTNode(t, n) {
          const r = this.metadata.predicate;
          if (Array.isArray(r))
            for (let i = 0; i < r.length; i++) {
              const o = r[i];
              this.matchTNodeWithReadOption(t, n, Ix(n, o)),
                this.matchTNodeWithReadOption(t, n, Xs(n, t, o, !1, !1));
            }
          else
            r === In
              ? 4 & n.type && this.matchTNodeWithReadOption(t, n, -1)
              : this.matchTNodeWithReadOption(t, n, Xs(n, t, r, !1, !1));
        }
        matchTNodeWithReadOption(t, n, r) {
          if (null !== r) {
            const i = this.metadata.read;
            if (null !== i)
              if (i === on || i === Ut || (i === In && 4 & n.type))
                this.addMatch(n.index, -2);
              else {
                const o = Xs(n, t, i, !1, !1);
                null !== o && this.addMatch(n.index, o);
              }
            else this.addMatch(n.index, r);
          }
        }
        addMatch(t, n) {
          null === this.matches
            ? (this.matches = [t, n])
            : this.matches.push(t, n);
        }
      }
      function Ix(e, t) {
        const n = e.localNames;
        if (null !== n)
          for (let r = 0; r < n.length; r += 2) if (n[r] === t) return n[r + 1];
        return null;
      }
      function Tx(e, t, n, r) {
        return -1 === n
          ? (function Sx(e, t) {
              return 11 & e.type ? di(e, t) : 4 & e.type ? Ja(e, t) : null;
            })(t, e)
          : -2 === n
          ? (function Ax(e, t, n) {
              return n === on
                ? di(t, e)
                : n === In
                ? Ja(t, e)
                : n === Ut
                ? DD(t, e)
                : void 0;
            })(e, t, r)
          : ur(e, e[w], n, t);
      }
      function bD(e, t, n, r) {
        const i = t[Xt].queries[r];
        if (null === i.matches) {
          const o = e.data,
            s = n.matches,
            a = [];
          for (let c = 0; c < s.length; c += 2) {
            const l = s[c];
            a.push(l < 0 ? null : Tx(t, o[l], s[c + 1], n.metadata.read));
          }
          i.matches = a;
        }
        return i.matches;
      }
      function Jd(e, t, n, r) {
        const i = e.queries.getByIndex(n),
          o = i.matches;
        if (null !== o) {
          const s = bD(e, t, i, n);
          for (let a = 0; a < o.length; a += 2) {
            const c = o[a];
            if (c > 0) r.push(s[a / 2]);
            else {
              const l = o[a + 1],
                u = t[-c];
              for (let d = Pe; d < u.length; d++) {
                const f = u[d];
                f[to] === f[he] && Jd(f[w], f, l, r);
              }
              if (null !== u[Ur]) {
                const d = u[Ur];
                for (let f = 0; f < d.length; f++) {
                  const h = d[f];
                  Jd(h[w], h, l, r);
                }
              }
            }
          }
        }
        return r;
      }
      function ef(e) {
        const t = D(),
          n = W(),
          r = kg();
        iu(r + 1);
        const i = AD(n, r);
        if (
          e.dirty &&
          (function eS(e) {
            return 4 == (4 & e[V]);
          })(t) ===
            (2 == (2 & i.metadata.flags))
        ) {
          if (null === i.matches) e.reset([]);
          else {
            const o = i.crossesNgTemplate ? Jd(n, t, r, []) : bD(n, t, i, r);
            e.reset(o, UT), e.notifyOnChanges();
          }
          return !0;
        }
        return !1;
      }
      function MD(e, t, n) {
        const r = W();
        r.firstCreatePass &&
          ((function TD(e, t, n) {
            null === e.queries && (e.queries = new Yd()),
              e.queries.track(new Xd(t, n));
          })(r, new wD(e, t, n), -1),
          2 == (2 & t) && (r.staticViewQueries = !0)),
          (function SD(e, t, n) {
            const r = new Wd(4 == (4 & n));
            (function CA(e, t, n, r) {
              const i = Qy(t);
              i.push(n), e.firstCreatePass && Yy(e).push(r, i.length - 1);
            })(e, t, r, r.destroy),
              null === t[Xt] && (t[Xt] = new Qd()),
              t[Xt].queries.push(new Zd(r));
          })(r, D(), t);
      }
      function AD(e, t) {
        return e.queries.getByIndex(t);
      }
      const lf = new E("Application Initializer");
      let uf = (() => {
          class e {
            constructor() {
              (this.initialized = !1),
                (this.done = !1),
                (this.donePromise = new Promise((n, r) => {
                  (this.resolve = n), (this.reject = r);
                })),
                (this.appInits = M(lf, { optional: !0 }) ?? []);
            }
            runInitializers() {
              if (this.initialized) return;
              const n = [];
              for (const i of this.appInits) {
                const o = i();
                if ($a(o)) n.push(o);
                else if (O_(o)) {
                  const s = new Promise((a, c) => {
                    o.subscribe({ complete: a, error: c });
                  });
                  n.push(s);
                }
              }
              const r = () => {
                (this.done = !0), this.resolve();
              };
              Promise.all(n)
                .then(() => {
                  r();
                })
                .catch((i) => {
                  this.reject(i);
                }),
                0 === n.length && r(),
                (this.initialized = !0);
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵprov = T({
              token: e,
              factory: e.ɵfac,
              providedIn: "root",
            }));
          }
          return e;
        })(),
        GD = (() => {
          class e {
            log(n) {
              console.log(n);
            }
            warn(n) {
              console.warn(n);
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵprov = T({
              token: e,
              factory: e.ɵfac,
              providedIn: "platform",
            }));
          }
          return e;
        })();
      const dn = new E("LocaleId", {
        providedIn: "root",
        factory: () =>
          M(dn, z.Optional | z.SkipSelf) ||
          (function Jx() {
            return (typeof $localize < "u" && $localize.locale) || Ti;
          })(),
      });
      let WD = (() => {
        class e {
          constructor() {
            (this.taskId = 0),
              (this.pendingTasks = new Set()),
              (this.hasPendingTasks = new Mt(!1));
          }
          add() {
            this.hasPendingTasks.next(!0);
            const n = this.taskId++;
            return this.pendingTasks.add(n), n;
          }
          remove(n) {
            this.pendingTasks.delete(n),
              0 === this.pendingTasks.size && this.hasPendingTasks.next(!1);
          }
          ngOnDestroy() {
            this.pendingTasks.clear(), this.hasPendingTasks.next(!1);
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵprov = T({
            token: e,
            factory: e.ɵfac,
            providedIn: "root",
          }));
        }
        return e;
      })();
      class nP {
        constructor(t, n) {
          (this.ngModuleFactory = t), (this.componentFactories = n);
        }
      }
      let KD = (() => {
        class e {
          compileModuleSync(n) {
            return new zd(n);
          }
          compileModuleAsync(n) {
            return Promise.resolve(this.compileModuleSync(n));
          }
          compileModuleAndAllComponentsSync(n) {
            const r = this.compileModuleSync(n),
              o = bn(ft(n).declarations).reduce((s, a) => {
                const c = G(a);
                return c && s.push(new Ro(c)), s;
              }, []);
            return new nP(r, o);
          }
          compileModuleAndAllComponentsAsync(n) {
            return Promise.resolve(this.compileModuleAndAllComponentsSync(n));
          }
          clearCache() {}
          clearCacheFor(n) {}
          getModuleId(n) {}
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵprov = T({
            token: e,
            factory: e.ɵfac,
            providedIn: "root",
          }));
        }
        return e;
      })();
      const XD = new E(""),
        rc = new E("");
      let gf,
        hf = (() => {
          class e {
            constructor(n, r, i) {
              (this._ngZone = n),
                (this.registry = r),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                gf ||
                  ((function bP(e) {
                    gf = e;
                  })(i),
                  i.addToWindow(r)),
                this._watchAngularEvents(),
                n.run(() => {
                  this.taskTrackingZone =
                    typeof Zone > "u"
                      ? null
                      : Zone.current.get("TaskTrackingZone");
                });
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  (this._didWork = !0), (this._isZoneStable = !1);
                },
              }),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.subscribe({
                    next: () => {
                      te.assertNotInAngularZone(),
                        queueMicrotask(() => {
                          (this._isZoneStable = !0),
                            this._runCallbacksIfReady();
                        });
                    },
                  });
                });
            }
            increasePendingRequestCount() {
              return (
                (this._pendingCount += 1),
                (this._didWork = !0),
                this._pendingCount
              );
            }
            decreasePendingRequestCount() {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error("pending async requests below zero");
              return this._runCallbacksIfReady(), this._pendingCount;
            }
            isStable() {
              return (
                this._isZoneStable &&
                0 === this._pendingCount &&
                !this._ngZone.hasPendingMacrotasks
              );
            }
            _runCallbacksIfReady() {
              if (this.isStable())
                queueMicrotask(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let n = this._callbacks.pop();
                    clearTimeout(n.timeoutId), n.doneCb(this._didWork);
                  }
                  this._didWork = !1;
                });
              else {
                let n = this.getPendingTasks();
                (this._callbacks = this._callbacks.filter(
                  (r) =>
                    !r.updateCb ||
                    !r.updateCb(n) ||
                    (clearTimeout(r.timeoutId), !1)
                )),
                  (this._didWork = !0);
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map((n) => ({
                    source: n.source,
                    creationLocation: n.creationLocation,
                    data: n.data,
                  }))
                : [];
            }
            addCallback(n, r, i) {
              let o = -1;
              r &&
                r > 0 &&
                (o = setTimeout(() => {
                  (this._callbacks = this._callbacks.filter(
                    (s) => s.timeoutId !== o
                  )),
                    n(this._didWork, this.getPendingTasks());
                }, r)),
                this._callbacks.push({ doneCb: n, timeoutId: o, updateCb: i });
            }
            whenStable(n, r, i) {
              if (i && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?'
                );
              this.addCallback(n, r, i), this._runCallbacksIfReady();
            }
            getPendingRequestCount() {
              return this._pendingCount;
            }
            registerApplication(n) {
              this.registry.registerApplication(n, this);
            }
            unregisterApplication(n) {
              this.registry.unregisterApplication(n);
            }
            findProviders(n, r, i) {
              return [];
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(C(te), C(pf), C(rc));
            });
            static #t = (this.ɵprov = T({ token: e, factory: e.ɵfac }));
          }
          return e;
        })(),
        pf = (() => {
          class e {
            constructor() {
              this._applications = new Map();
            }
            registerApplication(n, r) {
              this._applications.set(n, r);
            }
            unregisterApplication(n) {
              this._applications.delete(n);
            }
            unregisterAllApplications() {
              this._applications.clear();
            }
            getTestability(n) {
              return this._applications.get(n) || null;
            }
            getAllTestabilities() {
              return Array.from(this._applications.values());
            }
            getAllRootElements() {
              return Array.from(this._applications.keys());
            }
            findTestabilityInTree(n, r = !0) {
              return gf?.findTestabilityInTree(this, n, r) ?? null;
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵprov = T({
              token: e,
              factory: e.ɵfac,
              providedIn: "platform",
            }));
          }
          return e;
        })(),
        qn = null;
      const JD = new E("AllowMultipleToken"),
        mf = new E("PlatformDestroyListeners"),
        yf = new E("appBootstrapListener");
      class tE {
        constructor(t, n) {
          (this.name = t), (this.token = n);
        }
      }
      function rE(e, t, n = []) {
        const r = `Platform: ${t}`,
          i = new E(r);
        return (o = []) => {
          let s = _f();
          if (!s || s.injector.get(JD, !1)) {
            const a = [...n, ...o, { provide: i, useValue: !0 }];
            e
              ? e(a)
              : (function SP(e) {
                  if (qn && !qn.get(JD, !1)) throw new _(400, !1);
                  (function eE() {
                    !(function VI(e) {
                      gg = e;
                    })(() => {
                      throw new _(600, !1);
                    });
                  })(),
                    (qn = e);
                  const t = e.get(oE);
                  (function nE(e) {
                    e.get(cy, null)?.forEach((n) => n());
                  })(e);
                })(
                  (function iE(e = [], t) {
                    return mt.create({
                      name: t,
                      providers: [
                        { provide: Vu, useValue: "platform" },
                        { provide: mf, useValue: new Set([() => (qn = null)]) },
                        ...e,
                      ],
                    });
                  })(a, r)
                );
          }
          return (function AP(e) {
            const t = _f();
            if (!t) throw new _(401, !1);
            return t;
          })();
        };
      }
      function _f() {
        return qn?.get(oE) ?? null;
      }
      let oE = (() => {
        class e {
          constructor(n) {
            (this._injector = n),
              (this._modules = []),
              (this._destroyListeners = []),
              (this._destroyed = !1);
          }
          bootstrapModuleFactory(n, r) {
            const i = (function OP(e = "zone.js", t) {
              return "noop" === e ? new iA() : "zone.js" === e ? new te(t) : e;
            })(
              r?.ngZone,
              (function sE(e) {
                return {
                  enableLongStackTrace: !1,
                  shouldCoalesceEventChangeDetection: e?.eventCoalescing ?? !1,
                  shouldCoalesceRunChangeDetection: e?.runCoalescing ?? !1,
                };
              })({
                eventCoalescing: r?.ngZoneEventCoalescing,
                runCoalescing: r?.ngZoneRunCoalescing,
              })
            );
            return i.run(() => {
              const o = (function LR(e, t, n) {
                  return new Ud(e, t, n);
                })(
                  n.moduleType,
                  this.injector,
                  (function dE(e) {
                    return [
                      { provide: te, useFactory: e },
                      {
                        provide: bo,
                        multi: !0,
                        useFactory: () => {
                          const t = M(RP, { optional: !0 });
                          return () => t.initialize();
                        },
                      },
                      { provide: uE, useFactory: NP },
                      { provide: by, useFactory: My },
                    ];
                  })(() => i)
                ),
                s = o.injector.get(Nt, null);
              return (
                i.runOutsideAngular(() => {
                  const a = i.onError.subscribe({
                    next: (c) => {
                      s.handleError(c);
                    },
                  });
                  o.onDestroy(() => {
                    ic(this._modules, o), a.unsubscribe();
                  });
                }),
                (function aE(e, t, n) {
                  try {
                    const r = n();
                    return $a(r)
                      ? r.catch((i) => {
                          throw (
                            (t.runOutsideAngular(() => e.handleError(i)), i)
                          );
                        })
                      : r;
                  } catch (r) {
                    throw (t.runOutsideAngular(() => e.handleError(r)), r);
                  }
                })(s, i, () => {
                  const a = o.injector.get(uf);
                  return (
                    a.runInitializers(),
                    a.donePromise.then(
                      () => (
                        (function Av(e) {
                          It(e, "Expected localeId to be defined"),
                            "string" == typeof e &&
                              (Tv = e.toLowerCase().replace(/_/g, "-"));
                        })(o.injector.get(dn, Ti) || Ti),
                        this._moduleDoBootstrap(o),
                        o
                      )
                    )
                  );
                })
              );
            });
          }
          bootstrapModule(n, r = []) {
            const i = cE({}, r);
            return (function MP(e, t, n) {
              const r = new zd(n);
              return Promise.resolve(r);
            })(0, 0, n).then((o) => this.bootstrapModuleFactory(o, i));
          }
          _moduleDoBootstrap(n) {
            const r = n.injector.get(Dr);
            if (n._bootstrapComponents.length > 0)
              n._bootstrapComponents.forEach((i) => r.bootstrap(i));
            else {
              if (!n.instance.ngDoBootstrap) throw new _(-403, !1);
              n.instance.ngDoBootstrap(r);
            }
            this._modules.push(n);
          }
          onDestroy(n) {
            this._destroyListeners.push(n);
          }
          get injector() {
            return this._injector;
          }
          destroy() {
            if (this._destroyed) throw new _(404, !1);
            this._modules.slice().forEach((r) => r.destroy()),
              this._destroyListeners.forEach((r) => r());
            const n = this._injector.get(mf, null);
            n && (n.forEach((r) => r()), n.clear()), (this._destroyed = !0);
          }
          get destroyed() {
            return this._destroyed;
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(C(mt));
          });
          static #t = (this.ɵprov = T({
            token: e,
            factory: e.ɵfac,
            providedIn: "platform",
          }));
        }
        return e;
      })();
      function cE(e, t) {
        return Array.isArray(t) ? t.reduce(cE, e) : { ...e, ...t };
      }
      let Dr = (() => {
        class e {
          constructor() {
            (this._bootstrapListeners = []),
              (this._runningTick = !1),
              (this._destroyed = !1),
              (this._destroyListeners = []),
              (this._views = []),
              (this.internalErrorHandler = M(uE)),
              (this.zoneIsStable = M(by)),
              (this.componentTypes = []),
              (this.components = []),
              (this.isStable = M(WD).hasPendingTasks.pipe(
                Qt((n) => (n ? R(!1) : this.zoneIsStable)),
                (function XM(e, t = Fn) {
                  return (
                    (e = e ?? JM),
                    be((n, r) => {
                      let i,
                        o = !0;
                      n.subscribe(
                        De(r, (s) => {
                          const a = t(s);
                          (o || !e(i, a)) && ((o = !1), (i = a), r.next(s));
                        })
                      );
                    })
                  );
                })(),
                Il()
              )),
              (this._injector = M(Ot));
          }
          get destroyed() {
            return this._destroyed;
          }
          get injector() {
            return this._injector;
          }
          bootstrap(n, r) {
            const i = n instanceof hy;
            if (!this._injector.get(uf).done)
              throw (
                (!i &&
                  (function jr(e) {
                    const t = G(e) || xe(e) || qe(e);
                    return null !== t && t.standalone;
                  })(n),
                new _(405, !1))
              );
            let s;
            (s = i ? n : this._injector.get(Sa).resolveComponentFactory(n)),
              this.componentTypes.push(s.componentType);
            const a = (function IP(e) {
                return e.isBoundToModule;
              })(s)
                ? void 0
                : this._injector.get(vr),
              l = s.create(mt.NULL, [], r || s.selector, a),
              u = l.location.nativeElement,
              d = l.injector.get(XD, null);
            return (
              d?.registerApplication(u),
              l.onDestroy(() => {
                this.detachView(l.hostView),
                  ic(this.components, l),
                  d?.unregisterApplication(u);
              }),
              this._loadComponent(l),
              l
            );
          }
          tick() {
            if (this._runningTick) throw new _(101, !1);
            try {
              this._runningTick = !0;
              for (let n of this._views) n.detectChanges();
            } catch (n) {
              this.internalErrorHandler(n);
            } finally {
              this._runningTick = !1;
            }
          }
          attachView(n) {
            const r = n;
            this._views.push(r), r.attachToAppRef(this);
          }
          detachView(n) {
            const r = n;
            ic(this._views, r), r.detachFromAppRef();
          }
          _loadComponent(n) {
            this.attachView(n.hostView), this.tick(), this.components.push(n);
            const r = this._injector.get(yf, []);
            r.push(...this._bootstrapListeners), r.forEach((i) => i(n));
          }
          ngOnDestroy() {
            if (!this._destroyed)
              try {
                this._destroyListeners.forEach((n) => n()),
                  this._views.slice().forEach((n) => n.destroy());
              } finally {
                (this._destroyed = !0),
                  (this._views = []),
                  (this._bootstrapListeners = []),
                  (this._destroyListeners = []);
              }
          }
          onDestroy(n) {
            return (
              this._destroyListeners.push(n),
              () => ic(this._destroyListeners, n)
            );
          }
          destroy() {
            if (this._destroyed) throw new _(406, !1);
            const n = this._injector;
            n.destroy && !n.destroyed && n.destroy();
          }
          get viewCount() {
            return this._views.length;
          }
          warnIfDestroyed() {}
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵprov = T({
            token: e,
            factory: e.ɵfac,
            providedIn: "root",
          }));
        }
        return e;
      })();
      function ic(e, t) {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1);
      }
      const uE = new E("", {
        providedIn: "root",
        factory: () => M(Nt).handleError.bind(void 0),
      });
      function NP() {
        const e = M(te),
          t = M(Nt);
        return (n) => e.runOutsideAngular(() => t.handleError(n));
      }
      let RP = (() => {
        class e {
          constructor() {
            (this.zone = M(te)), (this.applicationRef = M(Dr));
          }
          initialize() {
            this._onMicrotaskEmptySubscription ||
              (this._onMicrotaskEmptySubscription =
                this.zone.onMicrotaskEmpty.subscribe({
                  next: () => {
                    this.zone.run(() => {
                      this.applicationRef.tick();
                    });
                  },
                }));
          }
          ngOnDestroy() {
            this._onMicrotaskEmptySubscription?.unsubscribe();
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵprov = T({
            token: e,
            factory: e.ɵfac,
            providedIn: "root",
          }));
        }
        return e;
      })();
      let vf = (() => {
        class e {
          static #e = (this.__NG_ELEMENT_ID__ = PP);
        }
        return e;
      })();
      function PP(e) {
        return (function FP(e, t, n) {
          if (sr(e) && !n) {
            const r = ht(e.index, t);
            return new No(r, r);
          }
          return 47 & e.type ? new No(t[Ce], t) : null;
        })(ke(), D(), 16 == (16 & e));
      }
      class gE {
        constructor() {}
        supports(t) {
          return ka(t);
        }
        create(t) {
          return new VP(t);
        }
      }
      const HP = (e, t) => t;
      class VP {
        constructor(t) {
          (this.length = 0),
            (this._linkedRecords = null),
            (this._unlinkedRecords = null),
            (this._previousItHead = null),
            (this._itHead = null),
            (this._itTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._movesHead = null),
            (this._movesTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null),
            (this._identityChangesHead = null),
            (this._identityChangesTail = null),
            (this._trackByFn = t || HP);
        }
        forEachItem(t) {
          let n;
          for (n = this._itHead; null !== n; n = n._next) t(n);
        }
        forEachOperation(t) {
          let n = this._itHead,
            r = this._removalsHead,
            i = 0,
            o = null;
          for (; n || r; ) {
            const s = !r || (n && n.currentIndex < yE(r, i, o)) ? n : r,
              a = yE(s, i, o),
              c = s.currentIndex;
            if (s === r) i--, (r = r._nextRemoved);
            else if (((n = n._next), null == s.previousIndex)) i++;
            else {
              o || (o = []);
              const l = a - i,
                u = c - i;
              if (l != u) {
                for (let f = 0; f < l; f++) {
                  const h = f < o.length ? o[f] : (o[f] = 0),
                    p = h + f;
                  u <= p && p < l && (o[f] = h + 1);
                }
                o[s.previousIndex] = u - l;
              }
            }
            a !== c && t(s, a, c);
          }
        }
        forEachPreviousItem(t) {
          let n;
          for (n = this._previousItHead; null !== n; n = n._nextPrevious) t(n);
        }
        forEachAddedItem(t) {
          let n;
          for (n = this._additionsHead; null !== n; n = n._nextAdded) t(n);
        }
        forEachMovedItem(t) {
          let n;
          for (n = this._movesHead; null !== n; n = n._nextMoved) t(n);
        }
        forEachRemovedItem(t) {
          let n;
          for (n = this._removalsHead; null !== n; n = n._nextRemoved) t(n);
        }
        forEachIdentityChange(t) {
          let n;
          for (
            n = this._identityChangesHead;
            null !== n;
            n = n._nextIdentityChange
          )
            t(n);
        }
        diff(t) {
          if ((null == t && (t = []), !ka(t))) throw new _(900, !1);
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let i,
            o,
            s,
            n = this._itHead,
            r = !1;
          if (Array.isArray(t)) {
            this.length = t.length;
            for (let a = 0; a < this.length; a++)
              (o = t[a]),
                (s = this._trackByFn(a, o)),
                null !== n && Object.is(n.trackById, s)
                  ? (r && (n = this._verifyReinsertion(n, o, s, a)),
                    Object.is(n.item, o) || this._addIdentityChange(n, o))
                  : ((n = this._mismatch(n, o, s, a)), (r = !0)),
                (n = n._next);
          } else
            (i = 0),
              (function pO(e, t) {
                if (Array.isArray(e))
                  for (let n = 0; n < e.length; n++) t(e[n]);
                else {
                  const n = e[Symbol.iterator]();
                  let r;
                  for (; !(r = n.next()).done; ) t(r.value);
                }
              })(t, (a) => {
                (s = this._trackByFn(i, a)),
                  null !== n && Object.is(n.trackById, s)
                    ? (r && (n = this._verifyReinsertion(n, a, s, i)),
                      Object.is(n.item, a) || this._addIdentityChange(n, a))
                    : ((n = this._mismatch(n, a, s, i)), (r = !0)),
                  (n = n._next),
                  i++;
              }),
              (this.length = i);
          return this._truncate(n), (this.collection = t), this.isDirty;
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._movesHead ||
            null !== this._removalsHead ||
            null !== this._identityChangesHead
          );
        }
        _reset() {
          if (this.isDirty) {
            let t;
            for (
              t = this._previousItHead = this._itHead;
              null !== t;
              t = t._next
            )
              t._nextPrevious = t._next;
            for (t = this._additionsHead; null !== t; t = t._nextAdded)
              t.previousIndex = t.currentIndex;
            for (
              this._additionsHead = this._additionsTail = null,
                t = this._movesHead;
              null !== t;
              t = t._nextMoved
            )
              t.previousIndex = t.currentIndex;
            (this._movesHead = this._movesTail = null),
              (this._removalsHead = this._removalsTail = null),
              (this._identityChangesHead = this._identityChangesTail = null);
          }
        }
        _mismatch(t, n, r, i) {
          let o;
          return (
            null === t ? (o = this._itTail) : ((o = t._prev), this._remove(t)),
            null !==
            (t =
              null === this._unlinkedRecords
                ? null
                : this._unlinkedRecords.get(r, null))
              ? (Object.is(t.item, n) || this._addIdentityChange(t, n),
                this._reinsertAfter(t, o, i))
              : null !==
                (t =
                  null === this._linkedRecords
                    ? null
                    : this._linkedRecords.get(r, i))
              ? (Object.is(t.item, n) || this._addIdentityChange(t, n),
                this._moveAfter(t, o, i))
              : (t = this._addAfter(new $P(n, r), o, i)),
            t
          );
        }
        _verifyReinsertion(t, n, r, i) {
          let o =
            null === this._unlinkedRecords
              ? null
              : this._unlinkedRecords.get(r, null);
          return (
            null !== o
              ? (t = this._reinsertAfter(o, t._prev, i))
              : t.currentIndex != i &&
                ((t.currentIndex = i), this._addToMoves(t, i)),
            t
          );
        }
        _truncate(t) {
          for (; null !== t; ) {
            const n = t._next;
            this._addToRemovals(this._unlink(t)), (t = n);
          }
          null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
            null !== this._additionsTail &&
              (this._additionsTail._nextAdded = null),
            null !== this._movesTail && (this._movesTail._nextMoved = null),
            null !== this._itTail && (this._itTail._next = null),
            null !== this._removalsTail &&
              (this._removalsTail._nextRemoved = null),
            null !== this._identityChangesTail &&
              (this._identityChangesTail._nextIdentityChange = null);
        }
        _reinsertAfter(t, n, r) {
          null !== this._unlinkedRecords && this._unlinkedRecords.remove(t);
          const i = t._prevRemoved,
            o = t._nextRemoved;
          return (
            null === i ? (this._removalsHead = o) : (i._nextRemoved = o),
            null === o ? (this._removalsTail = i) : (o._prevRemoved = i),
            this._insertAfter(t, n, r),
            this._addToMoves(t, r),
            t
          );
        }
        _moveAfter(t, n, r) {
          return (
            this._unlink(t),
            this._insertAfter(t, n, r),
            this._addToMoves(t, r),
            t
          );
        }
        _addAfter(t, n, r) {
          return (
            this._insertAfter(t, n, r),
            (this._additionsTail =
              null === this._additionsTail
                ? (this._additionsHead = t)
                : (this._additionsTail._nextAdded = t)),
            t
          );
        }
        _insertAfter(t, n, r) {
          const i = null === n ? this._itHead : n._next;
          return (
            (t._next = i),
            (t._prev = n),
            null === i ? (this._itTail = t) : (i._prev = t),
            null === n ? (this._itHead = t) : (n._next = t),
            null === this._linkedRecords && (this._linkedRecords = new mE()),
            this._linkedRecords.put(t),
            (t.currentIndex = r),
            t
          );
        }
        _remove(t) {
          return this._addToRemovals(this._unlink(t));
        }
        _unlink(t) {
          null !== this._linkedRecords && this._linkedRecords.remove(t);
          const n = t._prev,
            r = t._next;
          return (
            null === n ? (this._itHead = r) : (n._next = r),
            null === r ? (this._itTail = n) : (r._prev = n),
            t
          );
        }
        _addToMoves(t, n) {
          return (
            t.previousIndex === n ||
              (this._movesTail =
                null === this._movesTail
                  ? (this._movesHead = t)
                  : (this._movesTail._nextMoved = t)),
            t
          );
        }
        _addToRemovals(t) {
          return (
            null === this._unlinkedRecords &&
              (this._unlinkedRecords = new mE()),
            this._unlinkedRecords.put(t),
            (t.currentIndex = null),
            (t._nextRemoved = null),
            null === this._removalsTail
              ? ((this._removalsTail = this._removalsHead = t),
                (t._prevRemoved = null))
              : ((t._prevRemoved = this._removalsTail),
                (this._removalsTail = this._removalsTail._nextRemoved = t)),
            t
          );
        }
        _addIdentityChange(t, n) {
          return (
            (t.item = n),
            (this._identityChangesTail =
              null === this._identityChangesTail
                ? (this._identityChangesHead = t)
                : (this._identityChangesTail._nextIdentityChange = t)),
            t
          );
        }
      }
      class $P {
        constructor(t, n) {
          (this.item = t),
            (this.trackById = n),
            (this.currentIndex = null),
            (this.previousIndex = null),
            (this._nextPrevious = null),
            (this._prev = null),
            (this._next = null),
            (this._prevDup = null),
            (this._nextDup = null),
            (this._prevRemoved = null),
            (this._nextRemoved = null),
            (this._nextAdded = null),
            (this._nextMoved = null),
            (this._nextIdentityChange = null);
        }
      }
      class UP {
        constructor() {
          (this._head = null), (this._tail = null);
        }
        add(t) {
          null === this._head
            ? ((this._head = this._tail = t),
              (t._nextDup = null),
              (t._prevDup = null))
            : ((this._tail._nextDup = t),
              (t._prevDup = this._tail),
              (t._nextDup = null),
              (this._tail = t));
        }
        get(t, n) {
          let r;
          for (r = this._head; null !== r; r = r._nextDup)
            if (
              (null === n || n <= r.currentIndex) &&
              Object.is(r.trackById, t)
            )
              return r;
          return null;
        }
        remove(t) {
          const n = t._prevDup,
            r = t._nextDup;
          return (
            null === n ? (this._head = r) : (n._nextDup = r),
            null === r ? (this._tail = n) : (r._prevDup = n),
            null === this._head
          );
        }
      }
      class mE {
        constructor() {
          this.map = new Map();
        }
        put(t) {
          const n = t.trackById;
          let r = this.map.get(n);
          r || ((r = new UP()), this.map.set(n, r)), r.add(t);
        }
        get(t, n) {
          const i = this.map.get(t);
          return i ? i.get(t, n) : null;
        }
        remove(t) {
          const n = t.trackById;
          return this.map.get(n).remove(t) && this.map.delete(n), t;
        }
        get isEmpty() {
          return 0 === this.map.size;
        }
        clear() {
          this.map.clear();
        }
      }
      function yE(e, t, n) {
        const r = e.previousIndex;
        if (null === r) return r;
        let i = 0;
        return n && r < n.length && (i = n[r]), r + t + i;
      }
      function vE() {
        return new ac([new gE()]);
      }
      let ac = (() => {
        class e {
          static #e = (this.ɵprov = T({
            token: e,
            providedIn: "root",
            factory: vE,
          }));
          constructor(n) {
            this.factories = n;
          }
          static create(n, r) {
            if (null != r) {
              const i = r.factories.slice();
              n = n.concat(i);
            }
            return new e(n);
          }
          static extend(n) {
            return {
              provide: e,
              useFactory: (r) => e.create(n, r || vE()),
              deps: [[e, new mo(), new dr()]],
            };
          }
          find(n) {
            const r = this.factories.find((i) => i.supports(n));
            if (null != r) return r;
            throw new _(901, !1);
          }
        }
        return e;
      })();
      const KP = rE(null, "core", []);
      let ZP = (() => {
        class e {
          constructor(n) {}
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(C(Dr));
          });
          static #t = (this.ɵmod = dt({ type: e }));
          static #n = (this.ɵinj = tt({}));
        }
        return e;
      })();
      function Mf(e) {
        return "boolean" == typeof e ? e : null != e && "false" !== e;
      }
      let If = null;
      function Ni() {
        return If;
      }
      class lF {}
      const ye = new E("DocumentToken");
      let Sf = (() => {
        class e {
          historyGo(n) {
            throw new Error("Not implemented");
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵprov = T({
            token: e,
            factory: function () {
              return M(dF);
            },
            providedIn: "platform",
          }));
        }
        return e;
      })();
      const uF = new E("Location Initialized");
      let dF = (() => {
        class e extends Sf {
          constructor() {
            super(),
              (this._doc = M(ye)),
              (this._location = window.location),
              (this._history = window.history);
          }
          getBaseHrefFromDOM() {
            return Ni().getBaseHref(this._doc);
          }
          onPopState(n) {
            const r = Ni().getGlobalEventTarget(this._doc, "window");
            return (
              r.addEventListener("popstate", n, !1),
              () => r.removeEventListener("popstate", n)
            );
          }
          onHashChange(n) {
            const r = Ni().getGlobalEventTarget(this._doc, "window");
            return (
              r.addEventListener("hashchange", n, !1),
              () => r.removeEventListener("hashchange", n)
            );
          }
          get href() {
            return this._location.href;
          }
          get protocol() {
            return this._location.protocol;
          }
          get hostname() {
            return this._location.hostname;
          }
          get port() {
            return this._location.port;
          }
          get pathname() {
            return this._location.pathname;
          }
          get search() {
            return this._location.search;
          }
          get hash() {
            return this._location.hash;
          }
          set pathname(n) {
            this._location.pathname = n;
          }
          pushState(n, r, i) {
            this._history.pushState(n, r, i);
          }
          replaceState(n, r, i) {
            this._history.replaceState(n, r, i);
          }
          forward() {
            this._history.forward();
          }
          back() {
            this._history.back();
          }
          historyGo(n = 0) {
            this._history.go(n);
          }
          getState() {
            return this._history.state;
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵprov = T({
            token: e,
            factory: function () {
              return new e();
            },
            providedIn: "platform",
          }));
        }
        return e;
      })();
      function Tf(e, t) {
        if (0 == e.length) return t;
        if (0 == t.length) return e;
        let n = 0;
        return (
          e.endsWith("/") && n++,
          t.startsWith("/") && n++,
          2 == n ? e + t.substring(1) : 1 == n ? e + t : e + "/" + t
        );
      }
      function AE(e) {
        const t = e.match(/#|\?|$/),
          n = (t && t.index) || e.length;
        return e.slice(0, n - ("/" === e[n - 1] ? 1 : 0)) + e.slice(n);
      }
      function Sn(e) {
        return e && "?" !== e[0] ? "?" + e : e;
      }
      let Cr = (() => {
        class e {
          historyGo(n) {
            throw new Error("Not implemented");
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵprov = T({
            token: e,
            factory: function () {
              return M(NE);
            },
            providedIn: "root",
          }));
        }
        return e;
      })();
      const OE = new E("appBaseHref");
      let NE = (() => {
          class e extends Cr {
            constructor(n, r) {
              super(),
                (this._platformLocation = n),
                (this._removeListenerFns = []),
                (this._baseHref =
                  r ??
                  this._platformLocation.getBaseHrefFromDOM() ??
                  M(ye).location?.origin ??
                  "");
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(n) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(n),
                this._platformLocation.onHashChange(n)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            prepareExternalUrl(n) {
              return Tf(this._baseHref, n);
            }
            path(n = !1) {
              const r =
                  this._platformLocation.pathname +
                  Sn(this._platformLocation.search),
                i = this._platformLocation.hash;
              return i && n ? `${r}${i}` : r;
            }
            pushState(n, r, i, o) {
              const s = this.prepareExternalUrl(i + Sn(o));
              this._platformLocation.pushState(n, r, s);
            }
            replaceState(n, r, i, o) {
              const s = this.prepareExternalUrl(i + Sn(o));
              this._platformLocation.replaceState(n, r, s);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            getState() {
              return this._platformLocation.getState();
            }
            historyGo(n = 0) {
              this._platformLocation.historyGo?.(n);
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(C(Sf), C(OE, 8));
            });
            static #t = (this.ɵprov = T({
              token: e,
              factory: e.ɵfac,
              providedIn: "root",
            }));
          }
          return e;
        })(),
        fF = (() => {
          class e extends Cr {
            constructor(n, r) {
              super(),
                (this._platformLocation = n),
                (this._baseHref = ""),
                (this._removeListenerFns = []),
                null != r && (this._baseHref = r);
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(n) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(n),
                this._platformLocation.onHashChange(n)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            path(n = !1) {
              let r = this._platformLocation.hash;
              return null == r && (r = "#"), r.length > 0 ? r.substring(1) : r;
            }
            prepareExternalUrl(n) {
              const r = Tf(this._baseHref, n);
              return r.length > 0 ? "#" + r : r;
            }
            pushState(n, r, i, o) {
              let s = this.prepareExternalUrl(i + Sn(o));
              0 == s.length && (s = this._platformLocation.pathname),
                this._platformLocation.pushState(n, r, s);
            }
            replaceState(n, r, i, o) {
              let s = this.prepareExternalUrl(i + Sn(o));
              0 == s.length && (s = this._platformLocation.pathname),
                this._platformLocation.replaceState(n, r, s);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            getState() {
              return this._platformLocation.getState();
            }
            historyGo(n = 0) {
              this._platformLocation.historyGo?.(n);
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(C(Sf), C(OE, 8));
            });
            static #t = (this.ɵprov = T({ token: e, factory: e.ɵfac }));
          }
          return e;
        })(),
        Af = (() => {
          class e {
            constructor(n) {
              (this._subject = new Qe()),
                (this._urlChangeListeners = []),
                (this._urlChangeSubscription = null),
                (this._locationStrategy = n);
              const r = this._locationStrategy.getBaseHref();
              (this._basePath = (function gF(e) {
                if (new RegExp("^(https?:)?//").test(e)) {
                  const [, n] = e.split(/\/\/[^\/]+/);
                  return n;
                }
                return e;
              })(AE(RE(r)))),
                this._locationStrategy.onPopState((i) => {
                  this._subject.emit({
                    url: this.path(!0),
                    pop: !0,
                    state: i.state,
                    type: i.type,
                  });
                });
            }
            ngOnDestroy() {
              this._urlChangeSubscription?.unsubscribe(),
                (this._urlChangeListeners = []);
            }
            path(n = !1) {
              return this.normalize(this._locationStrategy.path(n));
            }
            getState() {
              return this._locationStrategy.getState();
            }
            isCurrentPathEqualTo(n, r = "") {
              return this.path() == this.normalize(n + Sn(r));
            }
            normalize(n) {
              return e.stripTrailingSlash(
                (function pF(e, t) {
                  if (!e || !t.startsWith(e)) return t;
                  const n = t.substring(e.length);
                  return "" === n || ["/", ";", "?", "#"].includes(n[0])
                    ? n
                    : t;
                })(this._basePath, RE(n))
              );
            }
            prepareExternalUrl(n) {
              return (
                n && "/" !== n[0] && (n = "/" + n),
                this._locationStrategy.prepareExternalUrl(n)
              );
            }
            go(n, r = "", i = null) {
              this._locationStrategy.pushState(i, "", n, r),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(n + Sn(r)),
                  i
                );
            }
            replaceState(n, r = "", i = null) {
              this._locationStrategy.replaceState(i, "", n, r),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(n + Sn(r)),
                  i
                );
            }
            forward() {
              this._locationStrategy.forward();
            }
            back() {
              this._locationStrategy.back();
            }
            historyGo(n = 0) {
              this._locationStrategy.historyGo?.(n);
            }
            onUrlChange(n) {
              return (
                this._urlChangeListeners.push(n),
                this._urlChangeSubscription ||
                  (this._urlChangeSubscription = this.subscribe((r) => {
                    this._notifyUrlChangeListeners(r.url, r.state);
                  })),
                () => {
                  const r = this._urlChangeListeners.indexOf(n);
                  this._urlChangeListeners.splice(r, 1),
                    0 === this._urlChangeListeners.length &&
                      (this._urlChangeSubscription?.unsubscribe(),
                      (this._urlChangeSubscription = null));
                }
              );
            }
            _notifyUrlChangeListeners(n = "", r) {
              this._urlChangeListeners.forEach((i) => i(n, r));
            }
            subscribe(n, r, i) {
              return this._subject.subscribe({
                next: n,
                error: r,
                complete: i,
              });
            }
            static #e = (this.normalizeQueryParams = Sn);
            static #t = (this.joinWithSlash = Tf);
            static #n = (this.stripTrailingSlash = AE);
            static #r = (this.ɵfac = function (r) {
              return new (r || e)(C(Cr));
            });
            static #i = (this.ɵprov = T({
              token: e,
              factory: function () {
                return (function hF() {
                  return new Af(C(Cr));
                })();
              },
              providedIn: "root",
            }));
          }
          return e;
        })();
      function RE(e) {
        return e.replace(/\/index.html$/, "");
      }
      class nk {
        constructor(t, n, r, i) {
          (this.$implicit = t),
            (this.ngForOf = n),
            (this.index = r),
            (this.count = i);
        }
        get first() {
          return 0 === this.index;
        }
        get last() {
          return this.index === this.count - 1;
        }
        get even() {
          return this.index % 2 == 0;
        }
        get odd() {
          return !this.even;
        }
      }
      let Hf = (() => {
        class e {
          set ngForOf(n) {
            (this._ngForOf = n), (this._ngForOfDirty = !0);
          }
          set ngForTrackBy(n) {
            this._trackByFn = n;
          }
          get ngForTrackBy() {
            return this._trackByFn;
          }
          constructor(n, r, i) {
            (this._viewContainer = n),
              (this._template = r),
              (this._differs = i),
              (this._ngForOf = null),
              (this._ngForOfDirty = !0),
              (this._differ = null);
          }
          set ngForTemplate(n) {
            n && (this._template = n);
          }
          ngDoCheck() {
            if (this._ngForOfDirty) {
              this._ngForOfDirty = !1;
              const n = this._ngForOf;
              !this._differ &&
                n &&
                (this._differ = this._differs
                  .find(n)
                  .create(this.ngForTrackBy));
            }
            if (this._differ) {
              const n = this._differ.diff(this._ngForOf);
              n && this._applyChanges(n);
            }
          }
          _applyChanges(n) {
            const r = this._viewContainer;
            n.forEachOperation((i, o, s) => {
              if (null == i.previousIndex)
                r.createEmbeddedView(
                  this._template,
                  new nk(i.item, this._ngForOf, -1, -1),
                  null === s ? void 0 : s
                );
              else if (null == s) r.remove(null === o ? void 0 : o);
              else if (null !== o) {
                const a = r.get(o);
                r.move(a, s), UE(a, i);
              }
            });
            for (let i = 0, o = r.length; i < o; i++) {
              const a = r.get(i).context;
              (a.index = i), (a.count = o), (a.ngForOf = this._ngForOf);
            }
            n.forEachIdentityChange((i) => {
              UE(r.get(i.currentIndex), i);
            });
          }
          static ngTemplateContextGuard(n, r) {
            return !0;
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(O(Ut), O(In), O(ac));
          });
          static #t = (this.ɵdir = ze({
            type: e,
            selectors: [["", "ngFor", "", "ngForOf", ""]],
            inputs: {
              ngForOf: "ngForOf",
              ngForTrackBy: "ngForTrackBy",
              ngForTemplate: "ngForTemplate",
            },
            standalone: !0,
          }));
        }
        return e;
      })();
      function UE(e, t) {
        e.context.$implicit = t.item;
      }
      let qf = (() => {
        class e {
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵmod = dt({ type: e }));
          static #n = (this.ɵinj = tt({}));
        }
        return e;
      })();
      const WE = "browser";
      function KE(e) {
        return "server" === e;
      }
      let xk = (() => {
        class e {
          static #e = (this.ɵprov = T({
            token: e,
            providedIn: "root",
            factory: () => new Pk(C(ye), window),
          }));
        }
        return e;
      })();
      class Pk {
        constructor(t, n) {
          (this.document = t), (this.window = n), (this.offset = () => [0, 0]);
        }
        setOffset(t) {
          this.offset = Array.isArray(t) ? () => t : t;
        }
        getScrollPosition() {
          return this.supportsScrolling()
            ? [this.window.pageXOffset, this.window.pageYOffset]
            : [0, 0];
        }
        scrollToPosition(t) {
          this.supportsScrolling() && this.window.scrollTo(t[0], t[1]);
        }
        scrollToAnchor(t) {
          if (!this.supportsScrolling()) return;
          const n = (function Fk(e, t) {
            const n = e.getElementById(t) || e.getElementsByName(t)[0];
            if (n) return n;
            if (
              "function" == typeof e.createTreeWalker &&
              e.body &&
              "function" == typeof e.body.attachShadow
            ) {
              const r = e.createTreeWalker(e.body, NodeFilter.SHOW_ELEMENT);
              let i = r.currentNode;
              for (; i; ) {
                const o = i.shadowRoot;
                if (o) {
                  const s =
                    o.getElementById(t) || o.querySelector(`[name="${t}"]`);
                  if (s) return s;
                }
                i = r.nextNode();
              }
            }
            return null;
          })(this.document, t);
          n && (this.scrollToElement(n), n.focus());
        }
        setHistoryScrollRestoration(t) {
          this.supportsScrolling() &&
            (this.window.history.scrollRestoration = t);
        }
        scrollToElement(t) {
          const n = t.getBoundingClientRect(),
            r = n.left + this.window.pageXOffset,
            i = n.top + this.window.pageYOffset,
            o = this.offset();
          this.window.scrollTo(r - o[0], i - o[1]);
        }
        supportsScrolling() {
          try {
            return (
              !!this.window &&
              !!this.window.scrollTo &&
              "pageXOffset" in this.window
            );
          } catch {
            return !1;
          }
        }
      }
      class s1 extends lF {
        constructor() {
          super(...arguments), (this.supportsDOMEvents = !0);
        }
      }
      class Kf extends s1 {
        static makeCurrent() {
          !(function cF(e) {
            If || (If = e);
          })(new Kf());
        }
        onAndCancel(t, n, r) {
          return (
            t.addEventListener(n, r),
            () => {
              t.removeEventListener(n, r);
            }
          );
        }
        dispatchEvent(t, n) {
          t.dispatchEvent(n);
        }
        remove(t) {
          t.parentNode && t.parentNode.removeChild(t);
        }
        createElement(t, n) {
          return (n = n || this.getDefaultDocument()).createElement(t);
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument("fakeTitle");
        }
        getDefaultDocument() {
          return document;
        }
        isElementNode(t) {
          return t.nodeType === Node.ELEMENT_NODE;
        }
        isShadowRoot(t) {
          return t instanceof DocumentFragment;
        }
        getGlobalEventTarget(t, n) {
          return "window" === n
            ? window
            : "document" === n
            ? t
            : "body" === n
            ? t.body
            : null;
        }
        getBaseHref(t) {
          const n = (function a1() {
            return (
              (Xo = Xo || document.querySelector("base")),
              Xo ? Xo.getAttribute("href") : null
            );
          })();
          return null == n
            ? null
            : (function c1(e) {
                (Ec = Ec || document.createElement("a")),
                  Ec.setAttribute("href", e);
                const t = Ec.pathname;
                return "/" === t.charAt(0) ? t : `/${t}`;
              })(n);
        }
        resetBaseElement() {
          Xo = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        getCookie(t) {
          return (function JF(e, t) {
            t = encodeURIComponent(t);
            for (const n of e.split(";")) {
              const r = n.indexOf("="),
                [i, o] = -1 == r ? [n, ""] : [n.slice(0, r), n.slice(r + 1)];
              if (i.trim() === t) return decodeURIComponent(o);
            }
            return null;
          })(document.cookie, t);
        }
      }
      let Ec,
        Xo = null,
        u1 = (() => {
          class e {
            build() {
              return new XMLHttpRequest();
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵprov = T({ token: e, factory: e.ɵfac }));
          }
          return e;
        })();
      const Zf = new E("EventManagerPlugins");
      let JE = (() => {
        class e {
          constructor(n, r) {
            (this._zone = r),
              (this._eventNameToPlugin = new Map()),
              n.forEach((i) => {
                i.manager = this;
              }),
              (this._plugins = n.slice().reverse());
          }
          addEventListener(n, r, i) {
            return this._findPluginFor(r).addEventListener(n, r, i);
          }
          getZone() {
            return this._zone;
          }
          _findPluginFor(n) {
            let r = this._eventNameToPlugin.get(n);
            if (r) return r;
            if (((r = this._plugins.find((o) => o.supports(n))), !r))
              throw new _(5101, !1);
            return this._eventNameToPlugin.set(n, r), r;
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(C(Zf), C(te));
          });
          static #t = (this.ɵprov = T({ token: e, factory: e.ɵfac }));
        }
        return e;
      })();
      class eC {
        constructor(t) {
          this._doc = t;
        }
      }
      const Qf = "ng-app-id";
      let tC = (() => {
        class e {
          constructor(n, r, i, o = {}) {
            (this.doc = n),
              (this.appId = r),
              (this.nonce = i),
              (this.platformId = o),
              (this.styleRef = new Map()),
              (this.hostNodes = new Set()),
              (this.styleNodesInDOM = this.collectServerRenderedStyles()),
              (this.platformIsServer = KE(o)),
              this.resetHostNodes();
          }
          addStyles(n) {
            for (const r of n)
              1 === this.changeUsageCount(r, 1) && this.onStyleAdded(r);
          }
          removeStyles(n) {
            for (const r of n)
              this.changeUsageCount(r, -1) <= 0 && this.onStyleRemoved(r);
          }
          ngOnDestroy() {
            const n = this.styleNodesInDOM;
            n && (n.forEach((r) => r.remove()), n.clear());
            for (const r of this.getAllStyles()) this.onStyleRemoved(r);
            this.resetHostNodes();
          }
          addHost(n) {
            this.hostNodes.add(n);
            for (const r of this.getAllStyles()) this.addStyleToHost(n, r);
          }
          removeHost(n) {
            this.hostNodes.delete(n);
          }
          getAllStyles() {
            return this.styleRef.keys();
          }
          onStyleAdded(n) {
            for (const r of this.hostNodes) this.addStyleToHost(r, n);
          }
          onStyleRemoved(n) {
            const r = this.styleRef;
            r.get(n)?.elements?.forEach((i) => i.remove()), r.delete(n);
          }
          collectServerRenderedStyles() {
            const n = this.doc.head?.querySelectorAll(
              `style[${Qf}="${this.appId}"]`
            );
            if (n?.length) {
              const r = new Map();
              return (
                n.forEach((i) => {
                  null != i.textContent && r.set(i.textContent, i);
                }),
                r
              );
            }
            return null;
          }
          changeUsageCount(n, r) {
            const i = this.styleRef;
            if (i.has(n)) {
              const o = i.get(n);
              return (o.usage += r), o.usage;
            }
            return i.set(n, { usage: r, elements: [] }), r;
          }
          getStyleElement(n, r) {
            const i = this.styleNodesInDOM,
              o = i?.get(r);
            if (o?.parentNode === n)
              return i.delete(r), o.removeAttribute(Qf), o;
            {
              const s = this.doc.createElement("style");
              return (
                this.nonce && s.setAttribute("nonce", this.nonce),
                (s.textContent = r),
                this.platformIsServer && s.setAttribute(Qf, this.appId),
                s
              );
            }
          }
          addStyleToHost(n, r) {
            const i = this.getStyleElement(n, r);
            n.appendChild(i);
            const o = this.styleRef,
              s = o.get(r)?.elements;
            s ? s.push(i) : o.set(r, { elements: [i], usage: 1 });
          }
          resetHostNodes() {
            const n = this.hostNodes;
            n.clear(), n.add(this.doc.head);
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(C(ye), C(Ea), C(qu, 8), C(gr));
          });
          static #t = (this.ɵprov = T({ token: e, factory: e.ɵfac }));
        }
        return e;
      })();
      const Yf = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: "http://www.w3.org/1999/xhtml",
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/",
          math: "http://www.w3.org/1998/MathML/",
        },
        Xf = /%COMP%/g,
        p1 = new E("RemoveStylesOnCompDestroy", {
          providedIn: "root",
          factory: () => !1,
        });
      function rC(e, t) {
        return t.map((n) => n.replace(Xf, e));
      }
      let Jf = (() => {
        class e {
          constructor(n, r, i, o, s, a, c, l = null) {
            (this.eventManager = n),
              (this.sharedStylesHost = r),
              (this.appId = i),
              (this.removeStylesOnCompDestroy = o),
              (this.doc = s),
              (this.platformId = a),
              (this.ngZone = c),
              (this.nonce = l),
              (this.rendererByCompId = new Map()),
              (this.platformIsServer = KE(a)),
              (this.defaultRenderer = new eh(n, s, c, this.platformIsServer));
          }
          createRenderer(n, r) {
            if (!n || !r) return this.defaultRenderer;
            this.platformIsServer &&
              r.encapsulation === St.ShadowDom &&
              (r = { ...r, encapsulation: St.Emulated });
            const i = this.getOrCreateRenderer(n, r);
            return (
              i instanceof oC
                ? i.applyToHost(n)
                : i instanceof th && i.applyStyles(),
              i
            );
          }
          getOrCreateRenderer(n, r) {
            const i = this.rendererByCompId;
            let o = i.get(r.id);
            if (!o) {
              const s = this.doc,
                a = this.ngZone,
                c = this.eventManager,
                l = this.sharedStylesHost,
                u = this.removeStylesOnCompDestroy,
                d = this.platformIsServer;
              switch (r.encapsulation) {
                case St.Emulated:
                  o = new oC(c, l, r, this.appId, u, s, a, d);
                  break;
                case St.ShadowDom:
                  return new _1(c, l, n, r, s, a, this.nonce, d);
                default:
                  o = new th(c, l, r, u, s, a, d);
              }
              i.set(r.id, o);
            }
            return o;
          }
          ngOnDestroy() {
            this.rendererByCompId.clear();
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(
              C(JE),
              C(tC),
              C(Ea),
              C(p1),
              C(ye),
              C(gr),
              C(te),
              C(qu)
            );
          });
          static #t = (this.ɵprov = T({ token: e, factory: e.ɵfac }));
        }
        return e;
      })();
      class eh {
        constructor(t, n, r, i) {
          (this.eventManager = t),
            (this.doc = n),
            (this.ngZone = r),
            (this.platformIsServer = i),
            (this.data = Object.create(null)),
            (this.destroyNode = null);
        }
        destroy() {}
        createElement(t, n) {
          return n
            ? this.doc.createElementNS(Yf[n] || n, t)
            : this.doc.createElement(t);
        }
        createComment(t) {
          return this.doc.createComment(t);
        }
        createText(t) {
          return this.doc.createTextNode(t);
        }
        appendChild(t, n) {
          (iC(t) ? t.content : t).appendChild(n);
        }
        insertBefore(t, n, r) {
          t && (iC(t) ? t.content : t).insertBefore(n, r);
        }
        removeChild(t, n) {
          t && t.removeChild(n);
        }
        selectRootElement(t, n) {
          let r = "string" == typeof t ? this.doc.querySelector(t) : t;
          if (!r) throw new _(-5104, !1);
          return n || (r.textContent = ""), r;
        }
        parentNode(t) {
          return t.parentNode;
        }
        nextSibling(t) {
          return t.nextSibling;
        }
        setAttribute(t, n, r, i) {
          if (i) {
            n = i + ":" + n;
            const o = Yf[i];
            o ? t.setAttributeNS(o, n, r) : t.setAttribute(n, r);
          } else t.setAttribute(n, r);
        }
        removeAttribute(t, n, r) {
          if (r) {
            const i = Yf[r];
            i ? t.removeAttributeNS(i, n) : t.removeAttribute(`${r}:${n}`);
          } else t.removeAttribute(n);
        }
        addClass(t, n) {
          t.classList.add(n);
        }
        removeClass(t, n) {
          t.classList.remove(n);
        }
        setStyle(t, n, r, i) {
          i & (Un.DashCase | Un.Important)
            ? t.style.setProperty(n, r, i & Un.Important ? "important" : "")
            : (t.style[n] = r);
        }
        removeStyle(t, n, r) {
          r & Un.DashCase ? t.style.removeProperty(n) : (t.style[n] = "");
        }
        setProperty(t, n, r) {
          t[n] = r;
        }
        setValue(t, n) {
          t.nodeValue = n;
        }
        listen(t, n, r) {
          if (
            "string" == typeof t &&
            !(t = Ni().getGlobalEventTarget(this.doc, t))
          )
            throw new Error(`Unsupported event target ${t} for event ${n}`);
          return this.eventManager.addEventListener(
            t,
            n,
            this.decoratePreventDefault(r)
          );
        }
        decoratePreventDefault(t) {
          return (n) => {
            if ("__ngUnwrap__" === n) return t;
            !1 ===
              (this.platformIsServer
                ? this.ngZone.runGuarded(() => t(n))
                : t(n)) && n.preventDefault();
          };
        }
      }
      function iC(e) {
        return "TEMPLATE" === e.tagName && void 0 !== e.content;
      }
      class _1 extends eh {
        constructor(t, n, r, i, o, s, a, c) {
          super(t, o, s, c),
            (this.sharedStylesHost = n),
            (this.hostEl = r),
            (this.shadowRoot = r.attachShadow({ mode: "open" })),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const l = rC(i.id, i.styles);
          for (const u of l) {
            const d = document.createElement("style");
            a && d.setAttribute("nonce", a),
              (d.textContent = u),
              this.shadowRoot.appendChild(d);
          }
        }
        nodeOrShadowRoot(t) {
          return t === this.hostEl ? this.shadowRoot : t;
        }
        appendChild(t, n) {
          return super.appendChild(this.nodeOrShadowRoot(t), n);
        }
        insertBefore(t, n, r) {
          return super.insertBefore(this.nodeOrShadowRoot(t), n, r);
        }
        removeChild(t, n) {
          return super.removeChild(this.nodeOrShadowRoot(t), n);
        }
        parentNode(t) {
          return this.nodeOrShadowRoot(
            super.parentNode(this.nodeOrShadowRoot(t))
          );
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
      }
      class th extends eh {
        constructor(t, n, r, i, o, s, a, c) {
          super(t, o, s, a),
            (this.sharedStylesHost = n),
            (this.removeStylesOnCompDestroy = i),
            (this.styles = c ? rC(c, r.styles) : r.styles);
        }
        applyStyles() {
          this.sharedStylesHost.addStyles(this.styles);
        }
        destroy() {
          this.removeStylesOnCompDestroy &&
            this.sharedStylesHost.removeStyles(this.styles);
        }
      }
      class oC extends th {
        constructor(t, n, r, i, o, s, a, c) {
          const l = i + "-" + r.id;
          super(t, n, r, o, s, a, c, l),
            (this.contentAttr = (function g1(e) {
              return "_ngcontent-%COMP%".replace(Xf, e);
            })(l)),
            (this.hostAttr = (function m1(e) {
              return "_nghost-%COMP%".replace(Xf, e);
            })(l));
        }
        applyToHost(t) {
          this.applyStyles(), this.setAttribute(t, this.hostAttr, "");
        }
        createElement(t, n) {
          const r = super.createElement(t, n);
          return super.setAttribute(r, this.contentAttr, ""), r;
        }
      }
      let v1 = (() => {
        class e extends eC {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return !0;
          }
          addEventListener(n, r, i) {
            return (
              n.addEventListener(r, i, !1),
              () => this.removeEventListener(n, r, i)
            );
          }
          removeEventListener(n, r, i) {
            return n.removeEventListener(r, i);
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(C(ye));
          });
          static #t = (this.ɵprov = T({ token: e, factory: e.ɵfac }));
        }
        return e;
      })();
      const sC = ["alt", "control", "meta", "shift"],
        D1 = {
          "\b": "Backspace",
          "\t": "Tab",
          "\x7f": "Delete",
          "\x1b": "Escape",
          Del: "Delete",
          Esc: "Escape",
          Left: "ArrowLeft",
          Right: "ArrowRight",
          Up: "ArrowUp",
          Down: "ArrowDown",
          Menu: "ContextMenu",
          Scroll: "ScrollLock",
          Win: "OS",
        },
        E1 = {
          alt: (e) => e.altKey,
          control: (e) => e.ctrlKey,
          meta: (e) => e.metaKey,
          shift: (e) => e.shiftKey,
        };
      let C1 = (() => {
        class e extends eC {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return null != e.parseEventName(n);
          }
          addEventListener(n, r, i) {
            const o = e.parseEventName(r),
              s = e.eventCallback(o.fullKey, i, this.manager.getZone());
            return this.manager
              .getZone()
              .runOutsideAngular(() => Ni().onAndCancel(n, o.domEventName, s));
          }
          static parseEventName(n) {
            const r = n.toLowerCase().split("."),
              i = r.shift();
            if (0 === r.length || ("keydown" !== i && "keyup" !== i))
              return null;
            const o = e._normalizeKey(r.pop());
            let s = "",
              a = r.indexOf("code");
            if (
              (a > -1 && (r.splice(a, 1), (s = "code.")),
              sC.forEach((l) => {
                const u = r.indexOf(l);
                u > -1 && (r.splice(u, 1), (s += l + "."));
              }),
              (s += o),
              0 != r.length || 0 === o.length)
            )
              return null;
            const c = {};
            return (c.domEventName = i), (c.fullKey = s), c;
          }
          static matchEventFullKeyCode(n, r) {
            let i = D1[n.key] || n.key,
              o = "";
            return (
              r.indexOf("code.") > -1 && ((i = n.code), (o = "code.")),
              !(null == i || !i) &&
                ((i = i.toLowerCase()),
                " " === i ? (i = "space") : "." === i && (i = "dot"),
                sC.forEach((s) => {
                  s !== i && (0, E1[s])(n) && (o += s + ".");
                }),
                (o += i),
                o === r)
            );
          }
          static eventCallback(n, r, i) {
            return (o) => {
              e.matchEventFullKeyCode(o, n) && i.runGuarded(() => r(o));
            };
          }
          static _normalizeKey(n) {
            return "esc" === n ? "escape" : n;
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(C(ye));
          });
          static #t = (this.ɵprov = T({ token: e, factory: e.ɵfac }));
        }
        return e;
      })();
      const I1 = rE(KP, "browser", [
          { provide: gr, useValue: WE },
          {
            provide: cy,
            useValue: function w1() {
              Kf.makeCurrent();
            },
            multi: !0,
          },
          {
            provide: ye,
            useFactory: function M1() {
              return (
                (function W0(e) {
                  xu = e;
                })(document),
                document
              );
            },
            deps: [],
          },
        ]),
        S1 = new E(""),
        lC = [
          {
            provide: rc,
            useClass: class l1 {
              addToWindow(t) {
                (ce.getAngularTestability = (r, i = !0) => {
                  const o = t.findTestabilityInTree(r, i);
                  if (null == o) throw new _(5103, !1);
                  return o;
                }),
                  (ce.getAllAngularTestabilities = () =>
                    t.getAllTestabilities()),
                  (ce.getAllAngularRootElements = () => t.getAllRootElements()),
                  ce.frameworkStabilizers || (ce.frameworkStabilizers = []),
                  ce.frameworkStabilizers.push((r) => {
                    const i = ce.getAllAngularTestabilities();
                    let o = i.length,
                      s = !1;
                    const a = function (c) {
                      (s = s || c), o--, 0 == o && r(s);
                    };
                    i.forEach((c) => {
                      c.whenStable(a);
                    });
                  });
              }
              findTestabilityInTree(t, n, r) {
                return null == n
                  ? null
                  : t.getTestability(n) ??
                      (r
                        ? Ni().isShadowRoot(n)
                          ? this.findTestabilityInTree(t, n.host, !0)
                          : this.findTestabilityInTree(t, n.parentElement, !0)
                        : null);
              }
            },
            deps: [],
          },
          { provide: XD, useClass: hf, deps: [te, pf, rc] },
          { provide: hf, useClass: hf, deps: [te, pf, rc] },
        ],
        uC = [
          { provide: Vu, useValue: "root" },
          {
            provide: Nt,
            useFactory: function b1() {
              return new Nt();
            },
            deps: [],
          },
          { provide: Zf, useClass: v1, multi: !0, deps: [ye, te, gr] },
          { provide: Zf, useClass: C1, multi: !0, deps: [ye] },
          Jf,
          tC,
          JE,
          { provide: So, useExisting: Jf },
          { provide: class kk {}, useClass: u1, deps: [] },
          [],
        ];
      let dC = (() => {
          class e {
            constructor(n) {}
            static withServerTransition(n) {
              return {
                ngModule: e,
                providers: [{ provide: Ea, useValue: n.appId }],
              };
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(C(S1, 12));
            });
            static #t = (this.ɵmod = dt({ type: e }));
            static #n = (this.ɵinj = tt({
              providers: [...uC, ...lC],
              imports: [qf, ZP],
            }));
          }
          return e;
        })(),
        fC = (() => {
          class e {
            constructor(n) {
              this._doc = n;
            }
            getTitle() {
              return this._doc.title;
            }
            setTitle(n) {
              this._doc.title = n || "";
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(C(ye));
            });
            static #t = (this.ɵprov = T({
              token: e,
              factory: function (r) {
                let i = null;
                return (
                  (i = r
                    ? new r()
                    : (function A1() {
                        return new fC(C(ye));
                      })()),
                  i
                );
              },
              providedIn: "root",
            }));
          }
          return e;
        })();
      typeof window < "u" && window;
      let rh = (() => {
          class e {
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵprov = T({
              token: e,
              factory: function (r) {
                let i = null;
                return (i = r ? new (r || e)() : C(gC)), i;
              },
              providedIn: "root",
            }));
          }
          return e;
        })(),
        gC = (() => {
          class e extends rh {
            constructor(n) {
              super(), (this._doc = n);
            }
            sanitize(n, r) {
              if (null == r) return null;
              switch (n) {
                case Le.NONE:
                  return r;
                case Le.HTML:
                  return rn(r, "HTML")
                    ? gt(r)
                    : Ym(this._doc, String(r)).toString();
                case Le.STYLE:
                  return rn(r, "Style") ? gt(r) : r;
                case Le.SCRIPT:
                  if (rn(r, "Script")) return gt(r);
                  throw new _(5200, !1);
                case Le.URL:
                  return rn(r, "URL") ? gt(r) : ga(String(r));
                case Le.RESOURCE_URL:
                  if (rn(r, "ResourceURL")) return gt(r);
                  throw new _(5201, !1);
                default:
                  throw new _(5202, !1);
              }
            }
            bypassSecurityTrustHtml(n) {
              return (function eT(e) {
                return new K0(e);
              })(n);
            }
            bypassSecurityTrustStyle(n) {
              return (function tT(e) {
                return new Z0(e);
              })(n);
            }
            bypassSecurityTrustScript(n) {
              return (function nT(e) {
                return new Q0(e);
              })(n);
            }
            bypassSecurityTrustUrl(n) {
              return (function rT(e) {
                return new Y0(e);
              })(n);
            }
            bypassSecurityTrustResourceUrl(n) {
              return (function iT(e) {
                return new X0(e);
              })(n);
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(C(ye));
            });
            static #t = (this.ɵprov = T({
              token: e,
              factory: function (r) {
                let i = null;
                return (
                  (i = r
                    ? new r()
                    : (function x1(e) {
                        return new gC(e.get(ye));
                      })(C(mt))),
                  i
                );
              },
              providedIn: "root",
            }));
          }
          return e;
        })();
      const { isArray: F1 } = Array,
        { getPrototypeOf: k1, prototype: L1, keys: j1 } = Object;
      function yC(e) {
        if (1 === e.length) {
          const t = e[0];
          if (F1(t)) return { args: t, keys: null };
          if (
            (function B1(e) {
              return e && "object" == typeof e && k1(e) === L1;
            })(t)
          ) {
            const n = j1(t);
            return { args: n.map((r) => t[r]), keys: n };
          }
        }
        return { args: e, keys: null };
      }
      const { isArray: H1 } = Array;
      function _C(e) {
        return U((t) =>
          (function V1(e, t) {
            return H1(t) ? e(...t) : e(t);
          })(e, t)
        );
      }
      function vC(e, t) {
        return e.reduce((n, r, i) => ((n[r] = t[i]), n), {});
      }
      function Cc(...e) {
        const t = Ki(e),
          n = Op(e),
          { args: r, keys: i } = yC(e);
        if (0 === r.length) return Re([], t);
        const o = new ve(
          (function $1(e, t, n = Fn) {
            return (r) => {
              DC(
                t,
                () => {
                  const { length: i } = e,
                    o = new Array(i);
                  let s = i,
                    a = i;
                  for (let c = 0; c < i; c++)
                    DC(
                      t,
                      () => {
                        const l = Re(e[c], t);
                        let u = !1;
                        l.subscribe(
                          De(
                            r,
                            (d) => {
                              (o[c] = d),
                                u || ((u = !0), a--),
                                a || r.next(n(o.slice()));
                            },
                            () => {
                              --s || r.complete();
                            }
                          )
                        );
                      },
                      r
                    );
                },
                r
              );
            };
          })(r, t, i ? (s) => vC(i, s) : Fn)
        );
        return n ? o.pipe(_C(n)) : o;
      }
      function DC(e, t, n) {
        e ? yn(n, e, t) : t();
      }
      const wc = Gi(
        (e) =>
          function () {
            e(this),
              (this.name = "EmptyError"),
              (this.message = "no elements in sequence");
          }
      );
      function bc(...e) {
        return (function U1() {
          return kr(1);
        })()(Re(e, Ki(e)));
      }
      function EC(e) {
        return new ve((t) => {
          lt(e()).subscribe(t);
        });
      }
      function xi(e, t) {
        const n = re(e) ? e : () => e,
          r = (i) => i.error(n());
        return new ve(t ? (i) => t.schedule(r, 0, i) : r);
      }
      function ih() {
        return be((e, t) => {
          let n = null;
          e._refCount++;
          const r = De(t, void 0, void 0, void 0, () => {
            if (!e || e._refCount <= 0 || 0 < --e._refCount)
              return void (n = null);
            const i = e._connection,
              o = n;
            (n = null),
              i && (!o || i === o) && i.unsubscribe(),
              t.unsubscribe();
          });
          e.subscribe(r), r.closed || (n = e.connect());
        });
      }
      class CC extends ve {
        constructor(t, n) {
          super(),
            (this.source = t),
            (this.subjectFactory = n),
            (this._subject = null),
            (this._refCount = 0),
            (this._connection = null),
            gp(t) && (this.lift = t.lift);
        }
        _subscribe(t) {
          return this.getSubject().subscribe(t);
        }
        getSubject() {
          const t = this._subject;
          return (
            (!t || t.isStopped) && (this._subject = this.subjectFactory()),
            this._subject
          );
        }
        _teardown() {
          this._refCount = 0;
          const { _connection: t } = this;
          (this._subject = this._connection = null), t?.unsubscribe();
        }
        connect() {
          let t = this._connection;
          if (!t) {
            t = this._connection = new Ue();
            const n = this.getSubject();
            t.add(
              this.source.subscribe(
                De(
                  n,
                  void 0,
                  () => {
                    this._teardown(), n.complete();
                  },
                  (r) => {
                    this._teardown(), n.error(r);
                  },
                  () => this._teardown()
                )
              )
            ),
              t.closed && ((this._connection = null), (t = Ue.EMPTY));
          }
          return t;
        }
        refCount() {
          return ih()(this);
        }
      }
      function Wn(e) {
        return e <= 0
          ? () => Zt
          : be((t, n) => {
              let r = 0;
              t.subscribe(
                De(n, (i) => {
                  ++r <= e && (n.next(i), e <= r && n.complete());
                })
              );
            });
      }
      function wC(...e) {
        const t = Ki(e);
        return be((n, r) => {
          (t ? bc(e, n, t) : bc(e, n)).subscribe(r);
        });
      }
      function fn(e, t) {
        return be((n, r) => {
          let i = 0;
          n.subscribe(De(r, (o) => e.call(t, o, i++) && r.next(o)));
        });
      }
      function Mc(e) {
        return be((t, n) => {
          let r = !1;
          t.subscribe(
            De(
              n,
              (i) => {
                (r = !0), n.next(i);
              },
              () => {
                r || n.next(e), n.complete();
              }
            )
          );
        });
      }
      function bC(e = z1) {
        return be((t, n) => {
          let r = !1;
          t.subscribe(
            De(
              n,
              (i) => {
                (r = !0), n.next(i);
              },
              () => (r ? n.complete() : n.error(e()))
            )
          );
        });
      }
      function z1() {
        return new wc();
      }
      function wr(e, t) {
        const n = arguments.length >= 2;
        return (r) =>
          r.pipe(
            e ? fn((i, o) => e(i, o, r)) : Fn,
            Wn(1),
            n ? Mc(t) : bC(() => new wc())
          );
      }
      function Pi(e, t) {
        return re(t) ? Ne(e, t, 1) : Ne(e, 1);
      }
      function Ae(e, t, n) {
        const r = re(e) || t || n ? { next: e, error: t, complete: n } : e;
        return r
          ? be((i, o) => {
              var s;
              null === (s = r.subscribe) || void 0 === s || s.call(r);
              let a = !0;
              i.subscribe(
                De(
                  o,
                  (c) => {
                    var l;
                    null === (l = r.next) || void 0 === l || l.call(r, c),
                      o.next(c);
                  },
                  () => {
                    var c;
                    (a = !1),
                      null === (c = r.complete) || void 0 === c || c.call(r),
                      o.complete();
                  },
                  (c) => {
                    var l;
                    (a = !1),
                      null === (l = r.error) || void 0 === l || l.call(r, c),
                      o.error(c);
                  },
                  () => {
                    var c, l;
                    a &&
                      (null === (c = r.unsubscribe) ||
                        void 0 === c ||
                        c.call(r)),
                      null === (l = r.finalize) || void 0 === l || l.call(r);
                  }
                )
              );
            })
          : Fn;
      }
      function Kn(e) {
        return be((t, n) => {
          let o,
            r = null,
            i = !1;
          (r = t.subscribe(
            De(n, void 0, void 0, (s) => {
              (o = lt(e(s, Kn(e)(t)))),
                r ? (r.unsubscribe(), (r = null), o.subscribe(n)) : (i = !0);
            })
          )),
            i && (r.unsubscribe(), (r = null), o.subscribe(n));
        });
      }
      function oh(e) {
        return e <= 0
          ? () => Zt
          : be((t, n) => {
              let r = [];
              t.subscribe(
                De(
                  n,
                  (i) => {
                    r.push(i), e < r.length && r.shift();
                  },
                  () => {
                    for (const i of r) n.next(i);
                    n.complete();
                  },
                  void 0,
                  () => {
                    r = null;
                  }
                )
              );
            });
      }
      function Ic(e) {
        return be((t, n) => {
          try {
            t.subscribe(n);
          } finally {
            n.add(e);
          }
        });
      }
      function MC(e) {
        return be((t, n) => {
          lt(e).subscribe(De(n, () => n.complete(), gl)),
            !n.closed && t.subscribe(n);
        });
      }
      const $ = "primary",
        Jo = Symbol("RouteTitle");
      class Z1 {
        constructor(t) {
          this.params = t || {};
        }
        has(t) {
          return Object.prototype.hasOwnProperty.call(this.params, t);
        }
        get(t) {
          if (this.has(t)) {
            const n = this.params[t];
            return Array.isArray(n) ? n[0] : n;
          }
          return null;
        }
        getAll(t) {
          if (this.has(t)) {
            const n = this.params[t];
            return Array.isArray(n) ? n : [n];
          }
          return [];
        }
        get keys() {
          return Object.keys(this.params);
        }
      }
      function Fi(e) {
        return new Z1(e);
      }
      function Q1(e, t, n) {
        const r = n.path.split("/");
        if (
          r.length > e.length ||
          ("full" === n.pathMatch && (t.hasChildren() || r.length < e.length))
        )
          return null;
        const i = {};
        for (let o = 0; o < r.length; o++) {
          const s = r[o],
            a = e[o];
          if (s.startsWith(":")) i[s.substring(1)] = a;
          else if (s !== a.path) return null;
        }
        return { consumed: e.slice(0, r.length), posParams: i };
      }
      function hn(e, t) {
        const n = e ? Object.keys(e) : void 0,
          r = t ? Object.keys(t) : void 0;
        if (!n || !r || n.length != r.length) return !1;
        let i;
        for (let o = 0; o < n.length; o++)
          if (((i = n[o]), !IC(e[i], t[i]))) return !1;
        return !0;
      }
      function IC(e, t) {
        if (Array.isArray(e) && Array.isArray(t)) {
          if (e.length !== t.length) return !1;
          const n = [...e].sort(),
            r = [...t].sort();
          return n.every((i, o) => r[o] === i);
        }
        return e === t;
      }
      function SC(e) {
        return e.length > 0 ? e[e.length - 1] : null;
      }
      function Zn(e) {
        return (function P1(e) {
          return !!e && (e instanceof ve || (re(e.lift) && re(e.subscribe)));
        })(e)
          ? e
          : $a(e)
          ? Re(Promise.resolve(e))
          : R(e);
      }
      const X1 = {
          exact: function OC(e, t, n) {
            if (
              !br(e.segments, t.segments) ||
              !Sc(e.segments, t.segments, n) ||
              e.numberOfChildren !== t.numberOfChildren
            )
              return !1;
            for (const r in t.children)
              if (!e.children[r] || !OC(e.children[r], t.children[r], n))
                return !1;
            return !0;
          },
          subset: NC,
        },
        TC = {
          exact: function J1(e, t) {
            return hn(e, t);
          },
          subset: function eL(e, t) {
            return (
              Object.keys(t).length <= Object.keys(e).length &&
              Object.keys(t).every((n) => IC(e[n], t[n]))
            );
          },
          ignored: () => !0,
        };
      function AC(e, t, n) {
        return (
          X1[n.paths](e.root, t.root, n.matrixParams) &&
          TC[n.queryParams](e.queryParams, t.queryParams) &&
          !("exact" === n.fragment && e.fragment !== t.fragment)
        );
      }
      function NC(e, t, n) {
        return RC(e, t, t.segments, n);
      }
      function RC(e, t, n, r) {
        if (e.segments.length > n.length) {
          const i = e.segments.slice(0, n.length);
          return !(!br(i, n) || t.hasChildren() || !Sc(i, n, r));
        }
        if (e.segments.length === n.length) {
          if (!br(e.segments, n) || !Sc(e.segments, n, r)) return !1;
          for (const i in t.children)
            if (!e.children[i] || !NC(e.children[i], t.children[i], r))
              return !1;
          return !0;
        }
        {
          const i = n.slice(0, e.segments.length),
            o = n.slice(e.segments.length);
          return (
            !!(br(e.segments, i) && Sc(e.segments, i, r) && e.children[$]) &&
            RC(e.children[$], t, o, r)
          );
        }
      }
      function Sc(e, t, n) {
        return t.every((r, i) => TC[n](e[i].parameters, r.parameters));
      }
      class ki {
        constructor(t = new ne([], {}), n = {}, r = null) {
          (this.root = t), (this.queryParams = n), (this.fragment = r);
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = Fi(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return rL.serialize(this);
        }
      }
      class ne {
        constructor(t, n) {
          (this.segments = t),
            (this.children = n),
            (this.parent = null),
            Object.values(n).forEach((r) => (r.parent = this));
        }
        hasChildren() {
          return this.numberOfChildren > 0;
        }
        get numberOfChildren() {
          return Object.keys(this.children).length;
        }
        toString() {
          return Tc(this);
        }
      }
      class es {
        constructor(t, n) {
          (this.path = t), (this.parameters = n);
        }
        get parameterMap() {
          return (
            this._parameterMap || (this._parameterMap = Fi(this.parameters)),
            this._parameterMap
          );
        }
        toString() {
          return FC(this);
        }
      }
      function br(e, t) {
        return e.length === t.length && e.every((n, r) => n.path === t[r].path);
      }
      let ts = (() => {
        class e {
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵprov = T({
            token: e,
            factory: function () {
              return new sh();
            },
            providedIn: "root",
          }));
        }
        return e;
      })();
      class sh {
        parse(t) {
          const n = new pL(t);
          return new ki(
            n.parseRootSegment(),
            n.parseQueryParams(),
            n.parseFragment()
          );
        }
        serialize(t) {
          const n = `/${ns(t.root, !0)}`,
            r = (function sL(e) {
              const t = Object.keys(e)
                .map((n) => {
                  const r = e[n];
                  return Array.isArray(r)
                    ? r.map((i) => `${Ac(n)}=${Ac(i)}`).join("&")
                    : `${Ac(n)}=${Ac(r)}`;
                })
                .filter((n) => !!n);
              return t.length ? `?${t.join("&")}` : "";
            })(t.queryParams);
          return `${n}${r}${
            "string" == typeof t.fragment
              ? `#${(function iL(e) {
                  return encodeURI(e);
                })(t.fragment)}`
              : ""
          }`;
        }
      }
      const rL = new sh();
      function Tc(e) {
        return e.segments.map((t) => FC(t)).join("/");
      }
      function ns(e, t) {
        if (!e.hasChildren()) return Tc(e);
        if (t) {
          const n = e.children[$] ? ns(e.children[$], !1) : "",
            r = [];
          return (
            Object.entries(e.children).forEach(([i, o]) => {
              i !== $ && r.push(`${i}:${ns(o, !1)}`);
            }),
            r.length > 0 ? `${n}(${r.join("//")})` : n
          );
        }
        {
          const n = (function nL(e, t) {
            let n = [];
            return (
              Object.entries(e.children).forEach(([r, i]) => {
                r === $ && (n = n.concat(t(i, r)));
              }),
              Object.entries(e.children).forEach(([r, i]) => {
                r !== $ && (n = n.concat(t(i, r)));
              }),
              n
            );
          })(e, (r, i) =>
            i === $ ? [ns(e.children[$], !1)] : [`${i}:${ns(r, !1)}`]
          );
          return 1 === Object.keys(e.children).length && null != e.children[$]
            ? `${Tc(e)}/${n[0]}`
            : `${Tc(e)}/(${n.join("//")})`;
        }
      }
      function xC(e) {
        return encodeURIComponent(e)
          .replace(/%40/g, "@")
          .replace(/%3A/gi, ":")
          .replace(/%24/g, "$")
          .replace(/%2C/gi, ",");
      }
      function Ac(e) {
        return xC(e).replace(/%3B/gi, ";");
      }
      function ah(e) {
        return xC(e)
          .replace(/\(/g, "%28")
          .replace(/\)/g, "%29")
          .replace(/%26/gi, "&");
      }
      function Oc(e) {
        return decodeURIComponent(e);
      }
      function PC(e) {
        return Oc(e.replace(/\+/g, "%20"));
      }
      function FC(e) {
        return `${ah(e.path)}${(function oL(e) {
          return Object.keys(e)
            .map((t) => `;${ah(t)}=${ah(e[t])}`)
            .join("");
        })(e.parameters)}`;
      }
      const aL = /^[^\/()?;#]+/;
      function ch(e) {
        const t = e.match(aL);
        return t ? t[0] : "";
      }
      const cL = /^[^\/()?;=#]+/,
        uL = /^[^=?&#]+/,
        fL = /^[^&#]+/;
      class pL {
        constructor(t) {
          (this.url = t), (this.remaining = t);
        }
        parseRootSegment() {
          return (
            this.consumeOptional("/"),
            "" === this.remaining ||
            this.peekStartsWith("?") ||
            this.peekStartsWith("#")
              ? new ne([], {})
              : new ne([], this.parseChildren())
          );
        }
        parseQueryParams() {
          const t = {};
          if (this.consumeOptional("?"))
            do {
              this.parseQueryParam(t);
            } while (this.consumeOptional("&"));
          return t;
        }
        parseFragment() {
          return this.consumeOptional("#")
            ? decodeURIComponent(this.remaining)
            : null;
        }
        parseChildren() {
          if ("" === this.remaining) return {};
          this.consumeOptional("/");
          const t = [];
          for (
            this.peekStartsWith("(") || t.push(this.parseSegment());
            this.peekStartsWith("/") &&
            !this.peekStartsWith("//") &&
            !this.peekStartsWith("/(");

          )
            this.capture("/"), t.push(this.parseSegment());
          let n = {};
          this.peekStartsWith("/(") &&
            (this.capture("/"), (n = this.parseParens(!0)));
          let r = {};
          return (
            this.peekStartsWith("(") && (r = this.parseParens(!1)),
            (t.length > 0 || Object.keys(n).length > 0) &&
              (r[$] = new ne(t, n)),
            r
          );
        }
        parseSegment() {
          const t = ch(this.remaining);
          if ("" === t && this.peekStartsWith(";")) throw new _(4009, !1);
          return this.capture(t), new es(Oc(t), this.parseMatrixParams());
        }
        parseMatrixParams() {
          const t = {};
          for (; this.consumeOptional(";"); ) this.parseParam(t);
          return t;
        }
        parseParam(t) {
          const n = (function lL(e) {
            const t = e.match(cL);
            return t ? t[0] : "";
          })(this.remaining);
          if (!n) return;
          this.capture(n);
          let r = "";
          if (this.consumeOptional("=")) {
            const i = ch(this.remaining);
            i && ((r = i), this.capture(r));
          }
          t[Oc(n)] = Oc(r);
        }
        parseQueryParam(t) {
          const n = (function dL(e) {
            const t = e.match(uL);
            return t ? t[0] : "";
          })(this.remaining);
          if (!n) return;
          this.capture(n);
          let r = "";
          if (this.consumeOptional("=")) {
            const s = (function hL(e) {
              const t = e.match(fL);
              return t ? t[0] : "";
            })(this.remaining);
            s && ((r = s), this.capture(r));
          }
          const i = PC(n),
            o = PC(r);
          if (t.hasOwnProperty(i)) {
            let s = t[i];
            Array.isArray(s) || ((s = [s]), (t[i] = s)), s.push(o);
          } else t[i] = o;
        }
        parseParens(t) {
          const n = {};
          for (
            this.capture("(");
            !this.consumeOptional(")") && this.remaining.length > 0;

          ) {
            const r = ch(this.remaining),
              i = this.remaining[r.length];
            if ("/" !== i && ")" !== i && ";" !== i) throw new _(4010, !1);
            let o;
            r.indexOf(":") > -1
              ? ((o = r.slice(0, r.indexOf(":"))),
                this.capture(o),
                this.capture(":"))
              : t && (o = $);
            const s = this.parseChildren();
            (n[o] = 1 === Object.keys(s).length ? s[$] : new ne([], s)),
              this.consumeOptional("//");
          }
          return n;
        }
        peekStartsWith(t) {
          return this.remaining.startsWith(t);
        }
        consumeOptional(t) {
          return (
            !!this.peekStartsWith(t) &&
            ((this.remaining = this.remaining.substring(t.length)), !0)
          );
        }
        capture(t) {
          if (!this.consumeOptional(t)) throw new _(4011, !1);
        }
      }
      function kC(e) {
        return e.segments.length > 0 ? new ne([], { [$]: e }) : e;
      }
      function LC(e) {
        const t = {};
        for (const r of Object.keys(e.children)) {
          const o = LC(e.children[r]);
          if (r === $ && 0 === o.segments.length && o.hasChildren())
            for (const [s, a] of Object.entries(o.children)) t[s] = a;
          else (o.segments.length > 0 || o.hasChildren()) && (t[r] = o);
        }
        return (function gL(e) {
          if (1 === e.numberOfChildren && e.children[$]) {
            const t = e.children[$];
            return new ne(e.segments.concat(t.segments), t.children);
          }
          return e;
        })(new ne(e.segments, t));
      }
      function Mr(e) {
        return e instanceof ki;
      }
      function jC(e) {
        let t;
        const i = kC(
          (function n(o) {
            const s = {};
            for (const c of o.children) {
              const l = n(c);
              s[c.outlet] = l;
            }
            const a = new ne(o.url, s);
            return o === e && (t = a), a;
          })(e.root)
        );
        return t ?? i;
      }
      function BC(e, t, n, r) {
        let i = e;
        for (; i.parent; ) i = i.parent;
        if (0 === t.length) return lh(i, i, i, n, r);
        const o = (function yL(e) {
          if ("string" == typeof e[0] && 1 === e.length && "/" === e[0])
            return new VC(!0, 0, e);
          let t = 0,
            n = !1;
          const r = e.reduce((i, o, s) => {
            if ("object" == typeof o && null != o) {
              if (o.outlets) {
                const a = {};
                return (
                  Object.entries(o.outlets).forEach(([c, l]) => {
                    a[c] = "string" == typeof l ? l.split("/") : l;
                  }),
                  [...i, { outlets: a }]
                );
              }
              if (o.segmentPath) return [...i, o.segmentPath];
            }
            return "string" != typeof o
              ? [...i, o]
              : 0 === s
              ? (o.split("/").forEach((a, c) => {
                  (0 == c && "." === a) ||
                    (0 == c && "" === a
                      ? (n = !0)
                      : ".." === a
                      ? t++
                      : "" != a && i.push(a));
                }),
                i)
              : [...i, o];
          }, []);
          return new VC(n, t, r);
        })(t);
        if (o.toRoot()) return lh(i, i, new ne([], {}), n, r);
        const s = (function _L(e, t, n) {
            if (e.isAbsolute) return new Rc(t, !0, 0);
            if (!n) return new Rc(t, !1, NaN);
            if (null === n.parent) return new Rc(n, !0, 0);
            const r = Nc(e.commands[0]) ? 0 : 1;
            return (function vL(e, t, n) {
              let r = e,
                i = t,
                o = n;
              for (; o > i; ) {
                if (((o -= i), (r = r.parent), !r)) throw new _(4005, !1);
                i = r.segments.length;
              }
              return new Rc(r, !1, i - o);
            })(n, n.segments.length - 1 + r, e.numberOfDoubleDots);
          })(o, i, e),
          a = s.processChildren
            ? is(s.segmentGroup, s.index, o.commands)
            : $C(s.segmentGroup, s.index, o.commands);
        return lh(i, s.segmentGroup, a, n, r);
      }
      function Nc(e) {
        return (
          "object" == typeof e && null != e && !e.outlets && !e.segmentPath
        );
      }
      function rs(e) {
        return "object" == typeof e && null != e && e.outlets;
      }
      function lh(e, t, n, r, i) {
        let s,
          o = {};
        r &&
          Object.entries(r).forEach(([c, l]) => {
            o[c] = Array.isArray(l) ? l.map((u) => `${u}`) : `${l}`;
          }),
          (s = e === t ? n : HC(e, t, n));
        const a = kC(LC(s));
        return new ki(a, o, i);
      }
      function HC(e, t, n) {
        const r = {};
        return (
          Object.entries(e.children).forEach(([i, o]) => {
            r[i] = o === t ? n : HC(o, t, n);
          }),
          new ne(e.segments, r)
        );
      }
      class VC {
        constructor(t, n, r) {
          if (
            ((this.isAbsolute = t),
            (this.numberOfDoubleDots = n),
            (this.commands = r),
            t && r.length > 0 && Nc(r[0]))
          )
            throw new _(4003, !1);
          const i = r.find(rs);
          if (i && i !== SC(r)) throw new _(4004, !1);
        }
        toRoot() {
          return (
            this.isAbsolute &&
            1 === this.commands.length &&
            "/" == this.commands[0]
          );
        }
      }
      class Rc {
        constructor(t, n, r) {
          (this.segmentGroup = t), (this.processChildren = n), (this.index = r);
        }
      }
      function $C(e, t, n) {
        if (
          (e || (e = new ne([], {})),
          0 === e.segments.length && e.hasChildren())
        )
          return is(e, t, n);
        const r = (function EL(e, t, n) {
            let r = 0,
              i = t;
            const o = { match: !1, pathIndex: 0, commandIndex: 0 };
            for (; i < e.segments.length; ) {
              if (r >= n.length) return o;
              const s = e.segments[i],
                a = n[r];
              if (rs(a)) break;
              const c = `${a}`,
                l = r < n.length - 1 ? n[r + 1] : null;
              if (i > 0 && void 0 === c) break;
              if (c && l && "object" == typeof l && void 0 === l.outlets) {
                if (!zC(c, l, s)) return o;
                r += 2;
              } else {
                if (!zC(c, {}, s)) return o;
                r++;
              }
              i++;
            }
            return { match: !0, pathIndex: i, commandIndex: r };
          })(e, t, n),
          i = n.slice(r.commandIndex);
        if (r.match && r.pathIndex < e.segments.length) {
          const o = new ne(e.segments.slice(0, r.pathIndex), {});
          return (
            (o.children[$] = new ne(e.segments.slice(r.pathIndex), e.children)),
            is(o, 0, i)
          );
        }
        return r.match && 0 === i.length
          ? new ne(e.segments, {})
          : r.match && !e.hasChildren()
          ? uh(e, t, n)
          : r.match
          ? is(e, 0, i)
          : uh(e, t, n);
      }
      function is(e, t, n) {
        if (0 === n.length) return new ne(e.segments, {});
        {
          const r = (function DL(e) {
              return rs(e[0]) ? e[0].outlets : { [$]: e };
            })(n),
            i = {};
          if (
            Object.keys(r).some((o) => o !== $) &&
            e.children[$] &&
            1 === e.numberOfChildren &&
            0 === e.children[$].segments.length
          ) {
            const o = is(e.children[$], t, n);
            return new ne(e.segments, o.children);
          }
          return (
            Object.entries(r).forEach(([o, s]) => {
              "string" == typeof s && (s = [s]),
                null !== s && (i[o] = $C(e.children[o], t, s));
            }),
            Object.entries(e.children).forEach(([o, s]) => {
              void 0 === r[o] && (i[o] = s);
            }),
            new ne(e.segments, i)
          );
        }
      }
      function uh(e, t, n) {
        const r = e.segments.slice(0, t);
        let i = 0;
        for (; i < n.length; ) {
          const o = n[i];
          if (rs(o)) {
            const c = CL(o.outlets);
            return new ne(r, c);
          }
          if (0 === i && Nc(n[0])) {
            r.push(new es(e.segments[t].path, UC(n[0]))), i++;
            continue;
          }
          const s = rs(o) ? o.outlets[$] : `${o}`,
            a = i < n.length - 1 ? n[i + 1] : null;
          s && a && Nc(a)
            ? (r.push(new es(s, UC(a))), (i += 2))
            : (r.push(new es(s, {})), i++);
        }
        return new ne(r, {});
      }
      function CL(e) {
        const t = {};
        return (
          Object.entries(e).forEach(([n, r]) => {
            "string" == typeof r && (r = [r]),
              null !== r && (t[n] = uh(new ne([], {}), 0, r));
          }),
          t
        );
      }
      function UC(e) {
        const t = {};
        return Object.entries(e).forEach(([n, r]) => (t[n] = `${r}`)), t;
      }
      function zC(e, t, n) {
        return e == n.path && hn(t, n.parameters);
      }
      const os = "imperative";
      class pn {
        constructor(t, n) {
          (this.id = t), (this.url = n);
        }
      }
      class xc extends pn {
        constructor(t, n, r = "imperative", i = null) {
          super(t, n),
            (this.type = 0),
            (this.navigationTrigger = r),
            (this.restoredState = i);
        }
        toString() {
          return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class Qn extends pn {
        constructor(t, n, r) {
          super(t, n), (this.urlAfterRedirects = r), (this.type = 1);
        }
        toString() {
          return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
        }
      }
      class ss extends pn {
        constructor(t, n, r, i) {
          super(t, n), (this.reason = r), (this.code = i), (this.type = 2);
        }
        toString() {
          return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class Li extends pn {
        constructor(t, n, r, i) {
          super(t, n), (this.reason = r), (this.code = i), (this.type = 16);
        }
      }
      class Pc extends pn {
        constructor(t, n, r, i) {
          super(t, n), (this.error = r), (this.target = i), (this.type = 3);
        }
        toString() {
          return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
        }
      }
      class qC extends pn {
        constructor(t, n, r, i) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = i),
            (this.type = 4);
        }
        toString() {
          return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class wL extends pn {
        constructor(t, n, r, i) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = i),
            (this.type = 7);
        }
        toString() {
          return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class bL extends pn {
        constructor(t, n, r, i, o) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = i),
            (this.shouldActivate = o),
            (this.type = 8);
        }
        toString() {
          return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
        }
      }
      class ML extends pn {
        constructor(t, n, r, i) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = i),
            (this.type = 5);
        }
        toString() {
          return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class IL extends pn {
        constructor(t, n, r, i) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = i),
            (this.type = 6);
        }
        toString() {
          return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class SL {
        constructor(t) {
          (this.route = t), (this.type = 9);
        }
        toString() {
          return `RouteConfigLoadStart(path: ${this.route.path})`;
        }
      }
      class TL {
        constructor(t) {
          (this.route = t), (this.type = 10);
        }
        toString() {
          return `RouteConfigLoadEnd(path: ${this.route.path})`;
        }
      }
      class AL {
        constructor(t) {
          (this.snapshot = t), (this.type = 11);
        }
        toString() {
          return `ChildActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class OL {
        constructor(t) {
          (this.snapshot = t), (this.type = 12);
        }
        toString() {
          return `ChildActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class NL {
        constructor(t) {
          (this.snapshot = t), (this.type = 13);
        }
        toString() {
          return `ActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class RL {
        constructor(t) {
          (this.snapshot = t), (this.type = 14);
        }
        toString() {
          return `ActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class GC {
        constructor(t, n, r) {
          (this.routerEvent = t),
            (this.position = n),
            (this.anchor = r),
            (this.type = 15);
        }
        toString() {
          return `Scroll(anchor: '${this.anchor}', position: '${
            this.position ? `${this.position[0]}, ${this.position[1]}` : null
          }')`;
        }
      }
      class dh {}
      class fh {
        constructor(t) {
          this.url = t;
        }
      }
      class xL {
        constructor() {
          (this.outlet = null),
            (this.route = null),
            (this.injector = null),
            (this.children = new as()),
            (this.attachRef = null);
        }
      }
      let as = (() => {
        class e {
          constructor() {
            this.contexts = new Map();
          }
          onChildOutletCreated(n, r) {
            const i = this.getOrCreateContext(n);
            (i.outlet = r), this.contexts.set(n, i);
          }
          onChildOutletDestroyed(n) {
            const r = this.getContext(n);
            r && ((r.outlet = null), (r.attachRef = null));
          }
          onOutletDeactivated() {
            const n = this.contexts;
            return (this.contexts = new Map()), n;
          }
          onOutletReAttached(n) {
            this.contexts = n;
          }
          getOrCreateContext(n) {
            let r = this.getContext(n);
            return r || ((r = new xL()), this.contexts.set(n, r)), r;
          }
          getContext(n) {
            return this.contexts.get(n) || null;
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵprov = T({
            token: e,
            factory: e.ɵfac,
            providedIn: "root",
          }));
        }
        return e;
      })();
      class WC {
        constructor(t) {
          this._root = t;
        }
        get root() {
          return this._root.value;
        }
        parent(t) {
          const n = this.pathFromRoot(t);
          return n.length > 1 ? n[n.length - 2] : null;
        }
        children(t) {
          const n = hh(t, this._root);
          return n ? n.children.map((r) => r.value) : [];
        }
        firstChild(t) {
          const n = hh(t, this._root);
          return n && n.children.length > 0 ? n.children[0].value : null;
        }
        siblings(t) {
          const n = ph(t, this._root);
          return n.length < 2
            ? []
            : n[n.length - 2].children
                .map((i) => i.value)
                .filter((i) => i !== t);
        }
        pathFromRoot(t) {
          return ph(t, this._root).map((n) => n.value);
        }
      }
      function hh(e, t) {
        if (e === t.value) return t;
        for (const n of t.children) {
          const r = hh(e, n);
          if (r) return r;
        }
        return null;
      }
      function ph(e, t) {
        if (e === t.value) return [t];
        for (const n of t.children) {
          const r = ph(e, n);
          if (r.length) return r.unshift(t), r;
        }
        return [];
      }
      class On {
        constructor(t, n) {
          (this.value = t), (this.children = n);
        }
        toString() {
          return `TreeNode(${this.value})`;
        }
      }
      function ji(e) {
        const t = {};
        return e && e.children.forEach((n) => (t[n.value.outlet] = n)), t;
      }
      class KC extends WC {
        constructor(t, n) {
          super(t), (this.snapshot = n), gh(this, t);
        }
        toString() {
          return this.snapshot.toString();
        }
      }
      function ZC(e, t) {
        const n = (function PL(e, t) {
            const s = new Fc([], {}, {}, "", {}, $, t, null, {});
            return new YC("", new On(s, []));
          })(0, t),
          r = new Mt([new es("", {})]),
          i = new Mt({}),
          o = new Mt({}),
          s = new Mt({}),
          a = new Mt(""),
          c = new Bi(r, i, s, a, o, $, t, n.root);
        return (c.snapshot = n.root), new KC(new On(c, []), n);
      }
      class Bi {
        constructor(t, n, r, i, o, s, a, c) {
          (this.urlSubject = t),
            (this.paramsSubject = n),
            (this.queryParamsSubject = r),
            (this.fragmentSubject = i),
            (this.dataSubject = o),
            (this.outlet = s),
            (this.component = a),
            (this._futureSnapshot = c),
            (this.title = this.dataSubject?.pipe(U((l) => l[Jo])) ?? R(void 0)),
            (this.url = t),
            (this.params = n),
            (this.queryParams = r),
            (this.fragment = i),
            (this.data = o);
        }
        get routeConfig() {
          return this._futureSnapshot.routeConfig;
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap ||
              (this._paramMap = this.params.pipe(U((t) => Fi(t)))),
            this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap ||
              (this._queryParamMap = this.queryParams.pipe(U((t) => Fi(t)))),
            this._queryParamMap
          );
        }
        toString() {
          return this.snapshot
            ? this.snapshot.toString()
            : `Future(${this._futureSnapshot})`;
        }
      }
      function QC(e, t = "emptyOnly") {
        const n = e.pathFromRoot;
        let r = 0;
        if ("always" !== t)
          for (r = n.length - 1; r >= 1; ) {
            const i = n[r],
              o = n[r - 1];
            if (i.routeConfig && "" === i.routeConfig.path) r--;
            else {
              if (o.component) break;
              r--;
            }
          }
        return (function FL(e) {
          return e.reduce(
            (t, n) => ({
              params: { ...t.params, ...n.params },
              data: { ...t.data, ...n.data },
              resolve: {
                ...n.data,
                ...t.resolve,
                ...n.routeConfig?.data,
                ...n._resolvedData,
              },
            }),
            { params: {}, data: {}, resolve: {} }
          );
        })(n.slice(r));
      }
      class Fc {
        get title() {
          return this.data?.[Jo];
        }
        constructor(t, n, r, i, o, s, a, c, l) {
          (this.url = t),
            (this.params = n),
            (this.queryParams = r),
            (this.fragment = i),
            (this.data = o),
            (this.outlet = s),
            (this.component = a),
            (this.routeConfig = c),
            (this._resolve = l);
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap || (this._paramMap = Fi(this.params)), this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = Fi(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return `Route(url:'${this.url
            .map((r) => r.toString())
            .join("/")}', path:'${
            this.routeConfig ? this.routeConfig.path : ""
          }')`;
        }
      }
      class YC extends WC {
        constructor(t, n) {
          super(n), (this.url = t), gh(this, n);
        }
        toString() {
          return XC(this._root);
        }
      }
      function gh(e, t) {
        (t.value._routerState = e), t.children.forEach((n) => gh(e, n));
      }
      function XC(e) {
        const t =
          e.children.length > 0 ? ` { ${e.children.map(XC).join(", ")} } ` : "";
        return `${e.value}${t}`;
      }
      function mh(e) {
        if (e.snapshot) {
          const t = e.snapshot,
            n = e._futureSnapshot;
          (e.snapshot = n),
            hn(t.queryParams, n.queryParams) ||
              e.queryParamsSubject.next(n.queryParams),
            t.fragment !== n.fragment && e.fragmentSubject.next(n.fragment),
            hn(t.params, n.params) || e.paramsSubject.next(n.params),
            (function Y1(e, t) {
              if (e.length !== t.length) return !1;
              for (let n = 0; n < e.length; ++n) if (!hn(e[n], t[n])) return !1;
              return !0;
            })(t.url, n.url) || e.urlSubject.next(n.url),
            hn(t.data, n.data) || e.dataSubject.next(n.data);
        } else
          (e.snapshot = e._futureSnapshot),
            e.dataSubject.next(e._futureSnapshot.data);
      }
      function yh(e, t) {
        const n =
          hn(e.params, t.params) &&
          (function tL(e, t) {
            return (
              br(e, t) && e.every((n, r) => hn(n.parameters, t[r].parameters))
            );
          })(e.url, t.url);
        return (
          n &&
          !(!e.parent != !t.parent) &&
          (!e.parent || yh(e.parent, t.parent))
        );
      }
      let _h = (() => {
        class e {
          constructor() {
            (this.activated = null),
              (this._activatedRoute = null),
              (this.name = $),
              (this.activateEvents = new Qe()),
              (this.deactivateEvents = new Qe()),
              (this.attachEvents = new Qe()),
              (this.detachEvents = new Qe()),
              (this.parentContexts = M(as)),
              (this.location = M(Ut)),
              (this.changeDetector = M(vf)),
              (this.environmentInjector = M(Ot)),
              (this.inputBinder = M(kc, { optional: !0 })),
              (this.supportsBindingToComponentInputs = !0);
          }
          get activatedComponentRef() {
            return this.activated;
          }
          ngOnChanges(n) {
            if (n.name) {
              const { firstChange: r, previousValue: i } = n.name;
              if (r) return;
              this.isTrackedInParentContexts(i) &&
                (this.deactivate(),
                this.parentContexts.onChildOutletDestroyed(i)),
                this.initializeOutletWithName();
            }
          }
          ngOnDestroy() {
            this.isTrackedInParentContexts(this.name) &&
              this.parentContexts.onChildOutletDestroyed(this.name),
              this.inputBinder?.unsubscribeFromRouteData(this);
          }
          isTrackedInParentContexts(n) {
            return this.parentContexts.getContext(n)?.outlet === this;
          }
          ngOnInit() {
            this.initializeOutletWithName();
          }
          initializeOutletWithName() {
            if (
              (this.parentContexts.onChildOutletCreated(this.name, this),
              this.activated)
            )
              return;
            const n = this.parentContexts.getContext(this.name);
            n?.route &&
              (n.attachRef
                ? this.attach(n.attachRef, n.route)
                : this.activateWith(n.route, n.injector));
          }
          get isActivated() {
            return !!this.activated;
          }
          get component() {
            if (!this.activated) throw new _(4012, !1);
            return this.activated.instance;
          }
          get activatedRoute() {
            if (!this.activated) throw new _(4012, !1);
            return this._activatedRoute;
          }
          get activatedRouteData() {
            return this._activatedRoute
              ? this._activatedRoute.snapshot.data
              : {};
          }
          detach() {
            if (!this.activated) throw new _(4012, !1);
            this.location.detach();
            const n = this.activated;
            return (
              (this.activated = null),
              (this._activatedRoute = null),
              this.detachEvents.emit(n.instance),
              n
            );
          }
          attach(n, r) {
            (this.activated = n),
              (this._activatedRoute = r),
              this.location.insert(n.hostView),
              this.inputBinder?.bindActivatedRouteToOutletComponent(this),
              this.attachEvents.emit(n.instance);
          }
          deactivate() {
            if (this.activated) {
              const n = this.component;
              this.activated.destroy(),
                (this.activated = null),
                (this._activatedRoute = null),
                this.deactivateEvents.emit(n);
            }
          }
          activateWith(n, r) {
            if (this.isActivated) throw new _(4013, !1);
            this._activatedRoute = n;
            const i = this.location,
              s = n.snapshot.component,
              a = this.parentContexts.getOrCreateContext(this.name).children,
              c = new kL(n, a, i.injector);
            (this.activated = i.createComponent(s, {
              index: i.length,
              injector: c,
              environmentInjector: r ?? this.environmentInjector,
            })),
              this.changeDetector.markForCheck(),
              this.inputBinder?.bindActivatedRouteToOutletComponent(this),
              this.activateEvents.emit(this.activated.instance);
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵdir = ze({
            type: e,
            selectors: [["router-outlet"]],
            inputs: { name: "name" },
            outputs: {
              activateEvents: "activate",
              deactivateEvents: "deactivate",
              attachEvents: "attach",
              detachEvents: "detach",
            },
            exportAs: ["outlet"],
            standalone: !0,
            features: [cr],
          }));
        }
        return e;
      })();
      class kL {
        constructor(t, n, r) {
          (this.route = t), (this.childContexts = n), (this.parent = r);
        }
        get(t, n) {
          return t === Bi
            ? this.route
            : t === as
            ? this.childContexts
            : this.parent.get(t, n);
        }
      }
      const kc = new E("");
      let JC = (() => {
        class e {
          constructor() {
            this.outletDataSubscriptions = new Map();
          }
          bindActivatedRouteToOutletComponent(n) {
            this.unsubscribeFromRouteData(n), this.subscribeToRouteData(n);
          }
          unsubscribeFromRouteData(n) {
            this.outletDataSubscriptions.get(n)?.unsubscribe(),
              this.outletDataSubscriptions.delete(n);
          }
          subscribeToRouteData(n) {
            const { activatedRoute: r } = n,
              i = Cc([r.queryParams, r.params, r.data])
                .pipe(
                  Qt(
                    ([o, s, a], c) => (
                      (a = { ...o, ...s, ...a }),
                      0 === c ? R(a) : Promise.resolve(a)
                    )
                  )
                )
                .subscribe((o) => {
                  if (
                    !n.isActivated ||
                    !n.activatedComponentRef ||
                    n.activatedRoute !== r ||
                    null === r.component
                  )
                    return void this.unsubscribeFromRouteData(n);
                  const s = (function aF(e) {
                    const t = G(e);
                    if (!t) return null;
                    const n = new Ro(t);
                    return {
                      get selector() {
                        return n.selector;
                      },
                      get type() {
                        return n.componentType;
                      },
                      get inputs() {
                        return n.inputs;
                      },
                      get outputs() {
                        return n.outputs;
                      },
                      get ngContentSelectors() {
                        return n.ngContentSelectors;
                      },
                      get isStandalone() {
                        return t.standalone;
                      },
                      get isSignal() {
                        return t.signals;
                      },
                    };
                  })(r.component);
                  if (s)
                    for (const { templateName: a } of s.inputs)
                      n.activatedComponentRef.setInput(a, o[a]);
                  else this.unsubscribeFromRouteData(n);
                });
            this.outletDataSubscriptions.set(n, i);
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵprov = T({ token: e, factory: e.ɵfac }));
        }
        return e;
      })();
      function cs(e, t, n) {
        if (n && e.shouldReuseRoute(t.value, n.value.snapshot)) {
          const r = n.value;
          r._futureSnapshot = t.value;
          const i = (function jL(e, t, n) {
            return t.children.map((r) => {
              for (const i of n.children)
                if (e.shouldReuseRoute(r.value, i.value.snapshot))
                  return cs(e, r, i);
              return cs(e, r);
            });
          })(e, t, n);
          return new On(r, i);
        }
        {
          if (e.shouldAttach(t.value)) {
            const o = e.retrieve(t.value);
            if (null !== o) {
              const s = o.route;
              return (
                (s.value._futureSnapshot = t.value),
                (s.children = t.children.map((a) => cs(e, a))),
                s
              );
            }
          }
          const r = (function BL(e) {
              return new Bi(
                new Mt(e.url),
                new Mt(e.params),
                new Mt(e.queryParams),
                new Mt(e.fragment),
                new Mt(e.data),
                e.outlet,
                e.component,
                e
              );
            })(t.value),
            i = t.children.map((o) => cs(e, o));
          return new On(r, i);
        }
      }
      const vh = "ngNavigationCancelingError";
      function ew(e, t) {
        const { redirectTo: n, navigationBehaviorOptions: r } = Mr(t)
            ? { redirectTo: t, navigationBehaviorOptions: void 0 }
            : t,
          i = tw(!1, 0, t);
        return (i.url = n), (i.navigationBehaviorOptions = r), i;
      }
      function tw(e, t, n) {
        const r = new Error("NavigationCancelingError: " + (e || ""));
        return (r[vh] = !0), (r.cancellationCode = t), n && (r.url = n), r;
      }
      function nw(e) {
        return e && e[vh];
      }
      let rw = (() => {
        class e {
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵcmp = or({
            type: e,
            selectors: [["ng-component"]],
            standalone: !0,
            features: [nD],
            decls: 1,
            vars: 0,
            template: function (r, i) {
              1 & r && _t(0, "router-outlet");
            },
            dependencies: [_h],
            encapsulation: 2,
          }));
        }
        return e;
      })();
      function Dh(e) {
        const t = e.children && e.children.map(Dh),
          n = t ? { ...e, children: t } : { ...e };
        return (
          !n.component &&
            !n.loadComponent &&
            (t || n.loadChildren) &&
            n.outlet &&
            n.outlet !== $ &&
            (n.component = rw),
          n
        );
      }
      function Gt(e) {
        return e.outlet || $;
      }
      function ls(e) {
        if (!e) return null;
        if (e.routeConfig?._injector) return e.routeConfig._injector;
        for (let t = e.parent; t; t = t.parent) {
          const n = t.routeConfig;
          if (n?._loadedInjector) return n._loadedInjector;
          if (n?._injector) return n._injector;
        }
        return null;
      }
      class WL {
        constructor(t, n, r, i, o) {
          (this.routeReuseStrategy = t),
            (this.futureState = n),
            (this.currState = r),
            (this.forwardEvent = i),
            (this.inputBindingEnabled = o);
        }
        activate(t) {
          const n = this.futureState._root,
            r = this.currState ? this.currState._root : null;
          this.deactivateChildRoutes(n, r, t),
            mh(this.futureState.root),
            this.activateChildRoutes(n, r, t);
        }
        deactivateChildRoutes(t, n, r) {
          const i = ji(n);
          t.children.forEach((o) => {
            const s = o.value.outlet;
            this.deactivateRoutes(o, i[s], r), delete i[s];
          }),
            Object.values(i).forEach((o) => {
              this.deactivateRouteAndItsChildren(o, r);
            });
        }
        deactivateRoutes(t, n, r) {
          const i = t.value,
            o = n ? n.value : null;
          if (i === o)
            if (i.component) {
              const s = r.getContext(i.outlet);
              s && this.deactivateChildRoutes(t, n, s.children);
            } else this.deactivateChildRoutes(t, n, r);
          else o && this.deactivateRouteAndItsChildren(n, r);
        }
        deactivateRouteAndItsChildren(t, n) {
          t.value.component &&
          this.routeReuseStrategy.shouldDetach(t.value.snapshot)
            ? this.detachAndStoreRouteSubtree(t, n)
            : this.deactivateRouteAndOutlet(t, n);
        }
        detachAndStoreRouteSubtree(t, n) {
          const r = n.getContext(t.value.outlet),
            i = r && t.value.component ? r.children : n,
            o = ji(t);
          for (const s of Object.keys(o))
            this.deactivateRouteAndItsChildren(o[s], i);
          if (r && r.outlet) {
            const s = r.outlet.detach(),
              a = r.children.onOutletDeactivated();
            this.routeReuseStrategy.store(t.value.snapshot, {
              componentRef: s,
              route: t,
              contexts: a,
            });
          }
        }
        deactivateRouteAndOutlet(t, n) {
          const r = n.getContext(t.value.outlet),
            i = r && t.value.component ? r.children : n,
            o = ji(t);
          for (const s of Object.keys(o))
            this.deactivateRouteAndItsChildren(o[s], i);
          r &&
            (r.outlet &&
              (r.outlet.deactivate(), r.children.onOutletDeactivated()),
            (r.attachRef = null),
            (r.route = null));
        }
        activateChildRoutes(t, n, r) {
          const i = ji(n);
          t.children.forEach((o) => {
            this.activateRoutes(o, i[o.value.outlet], r),
              this.forwardEvent(new RL(o.value.snapshot));
          }),
            t.children.length && this.forwardEvent(new OL(t.value.snapshot));
        }
        activateRoutes(t, n, r) {
          const i = t.value,
            o = n ? n.value : null;
          if ((mh(i), i === o))
            if (i.component) {
              const s = r.getOrCreateContext(i.outlet);
              this.activateChildRoutes(t, n, s.children);
            } else this.activateChildRoutes(t, n, r);
          else if (i.component) {
            const s = r.getOrCreateContext(i.outlet);
            if (this.routeReuseStrategy.shouldAttach(i.snapshot)) {
              const a = this.routeReuseStrategy.retrieve(i.snapshot);
              this.routeReuseStrategy.store(i.snapshot, null),
                s.children.onOutletReAttached(a.contexts),
                (s.attachRef = a.componentRef),
                (s.route = a.route.value),
                s.outlet && s.outlet.attach(a.componentRef, a.route.value),
                mh(a.route.value),
                this.activateChildRoutes(t, null, s.children);
            } else {
              const a = ls(i.snapshot);
              (s.attachRef = null),
                (s.route = i),
                (s.injector = a),
                s.outlet && s.outlet.activateWith(i, s.injector),
                this.activateChildRoutes(t, null, s.children);
            }
          } else this.activateChildRoutes(t, null, r);
        }
      }
      class iw {
        constructor(t) {
          (this.path = t), (this.route = this.path[this.path.length - 1]);
        }
      }
      class Lc {
        constructor(t, n) {
          (this.component = t), (this.route = n);
        }
      }
      function KL(e, t, n) {
        const r = e._root;
        return us(r, t ? t._root : null, n, [r.value]);
      }
      function Hi(e, t) {
        const n = Symbol(),
          r = t.get(e, n);
        return r === n
          ? "function" != typeof e ||
            (function sI(e) {
              return null !== Rs(e);
            })(e)
            ? t.get(e)
            : e
          : r;
      }
      function us(
        e,
        t,
        n,
        r,
        i = { canDeactivateChecks: [], canActivateChecks: [] }
      ) {
        const o = ji(t);
        return (
          e.children.forEach((s) => {
            (function QL(
              e,
              t,
              n,
              r,
              i = { canDeactivateChecks: [], canActivateChecks: [] }
            ) {
              const o = e.value,
                s = t ? t.value : null,
                a = n ? n.getContext(e.value.outlet) : null;
              if (s && o.routeConfig === s.routeConfig) {
                const c = (function YL(e, t, n) {
                  if ("function" == typeof n) return n(e, t);
                  switch (n) {
                    case "pathParamsChange":
                      return !br(e.url, t.url);
                    case "pathParamsOrQueryParamsChange":
                      return (
                        !br(e.url, t.url) || !hn(e.queryParams, t.queryParams)
                      );
                    case "always":
                      return !0;
                    case "paramsOrQueryParamsChange":
                      return !yh(e, t) || !hn(e.queryParams, t.queryParams);
                    default:
                      return !yh(e, t);
                  }
                })(s, o, o.routeConfig.runGuardsAndResolvers);
                c
                  ? i.canActivateChecks.push(new iw(r))
                  : ((o.data = s.data), (o._resolvedData = s._resolvedData)),
                  us(e, t, o.component ? (a ? a.children : null) : n, r, i),
                  c &&
                    a &&
                    a.outlet &&
                    a.outlet.isActivated &&
                    i.canDeactivateChecks.push(new Lc(a.outlet.component, s));
              } else
                s && ds(t, a, i),
                  i.canActivateChecks.push(new iw(r)),
                  us(e, null, o.component ? (a ? a.children : null) : n, r, i);
            })(s, o[s.value.outlet], n, r.concat([s.value]), i),
              delete o[s.value.outlet];
          }),
          Object.entries(o).forEach(([s, a]) => ds(a, n.getContext(s), i)),
          i
        );
      }
      function ds(e, t, n) {
        const r = ji(e),
          i = e.value;
        Object.entries(r).forEach(([o, s]) => {
          ds(s, i.component ? (t ? t.children.getContext(o) : null) : t, n);
        }),
          n.canDeactivateChecks.push(
            new Lc(
              i.component && t && t.outlet && t.outlet.isActivated
                ? t.outlet.component
                : null,
              i
            )
          );
      }
      function fs(e) {
        return "function" == typeof e;
      }
      function ow(e) {
        return e instanceof wc || "EmptyError" === e?.name;
      }
      const jc = Symbol("INITIAL_VALUE");
      function Vi() {
        return Qt((e) =>
          Cc(e.map((t) => t.pipe(Wn(1), wC(jc)))).pipe(
            U((t) => {
              for (const n of t)
                if (!0 !== n) {
                  if (n === jc) return jc;
                  if (!1 === n || n instanceof ki) return n;
                }
              return !0;
            }),
            fn((t) => t !== jc),
            Wn(1)
          )
        );
      }
      function sw(e) {
        return (function cM(...e) {
          return fp(e);
        })(
          Ae((t) => {
            if (Mr(t)) throw ew(0, t);
          }),
          U((t) => !0 === t)
        );
      }
      class Bc {
        constructor(t) {
          this.segmentGroup = t || null;
        }
      }
      class aw {
        constructor(t) {
          this.urlTree = t;
        }
      }
      function $i(e) {
        return xi(new Bc(e));
      }
      function cw(e) {
        return xi(new aw(e));
      }
      class yj {
        constructor(t, n) {
          (this.urlSerializer = t), (this.urlTree = n);
        }
        noMatchError(t) {
          return new _(4002, !1);
        }
        lineralizeSegments(t, n) {
          let r = [],
            i = n.root;
          for (;;) {
            if (((r = r.concat(i.segments)), 0 === i.numberOfChildren))
              return R(r);
            if (i.numberOfChildren > 1 || !i.children[$])
              return xi(new _(4e3, !1));
            i = i.children[$];
          }
        }
        applyRedirectCommands(t, n, r) {
          return this.applyRedirectCreateUrlTree(
            n,
            this.urlSerializer.parse(n),
            t,
            r
          );
        }
        applyRedirectCreateUrlTree(t, n, r, i) {
          const o = this.createSegmentGroup(t, n.root, r, i);
          return new ki(
            o,
            this.createQueryParams(n.queryParams, this.urlTree.queryParams),
            n.fragment
          );
        }
        createQueryParams(t, n) {
          const r = {};
          return (
            Object.entries(t).forEach(([i, o]) => {
              if ("string" == typeof o && o.startsWith(":")) {
                const a = o.substring(1);
                r[i] = n[a];
              } else r[i] = o;
            }),
            r
          );
        }
        createSegmentGroup(t, n, r, i) {
          const o = this.createSegments(t, n.segments, r, i);
          let s = {};
          return (
            Object.entries(n.children).forEach(([a, c]) => {
              s[a] = this.createSegmentGroup(t, c, r, i);
            }),
            new ne(o, s)
          );
        }
        createSegments(t, n, r, i) {
          return n.map((o) =>
            o.path.startsWith(":")
              ? this.findPosParam(t, o, i)
              : this.findOrReturn(o, r)
          );
        }
        findPosParam(t, n, r) {
          const i = r[n.path.substring(1)];
          if (!i) throw new _(4001, !1);
          return i;
        }
        findOrReturn(t, n) {
          let r = 0;
          for (const i of n) {
            if (i.path === t.path) return n.splice(r), i;
            r++;
          }
          return t;
        }
      }
      const Eh = {
        matched: !1,
        consumedSegments: [],
        remainingSegments: [],
        parameters: {},
        positionalParamSegments: {},
      };
      function _j(e, t, n, r, i) {
        const o = Ch(e, t, n);
        return o.matched
          ? ((r = (function VL(e, t) {
              return (
                e.providers &&
                  !e._injector &&
                  (e._injector = qd(e.providers, t, `Route: ${e.path}`)),
                e._injector ?? t
              );
            })(t, r)),
            (function pj(e, t, n, r) {
              const i = t.canMatch;
              return i && 0 !== i.length
                ? R(
                    i.map((s) => {
                      const a = Hi(s, e);
                      return Zn(
                        (function rj(e) {
                          return e && fs(e.canMatch);
                        })(a)
                          ? a.canMatch(t, n)
                          : e.runInContext(() => a(t, n))
                      );
                    })
                  ).pipe(Vi(), sw())
                : R(!0);
            })(r, t, n).pipe(U((s) => (!0 === s ? o : { ...Eh }))))
          : R(o);
      }
      function Ch(e, t, n) {
        if ("" === t.path)
          return "full" === t.pathMatch && (e.hasChildren() || n.length > 0)
            ? { ...Eh }
            : {
                matched: !0,
                consumedSegments: [],
                remainingSegments: n,
                parameters: {},
                positionalParamSegments: {},
              };
        const i = (t.matcher || Q1)(n, e, t);
        if (!i) return { ...Eh };
        const o = {};
        Object.entries(i.posParams ?? {}).forEach(([a, c]) => {
          o[a] = c.path;
        });
        const s =
          i.consumed.length > 0
            ? { ...o, ...i.consumed[i.consumed.length - 1].parameters }
            : o;
        return {
          matched: !0,
          consumedSegments: i.consumed,
          remainingSegments: n.slice(i.consumed.length),
          parameters: s,
          positionalParamSegments: i.posParams ?? {},
        };
      }
      function lw(e, t, n, r) {
        return n.length > 0 &&
          (function Ej(e, t, n) {
            return n.some((r) => Hc(e, t, r) && Gt(r) !== $);
          })(e, n, r)
          ? {
              segmentGroup: new ne(t, Dj(r, new ne(n, e.children))),
              slicedSegments: [],
            }
          : 0 === n.length &&
            (function Cj(e, t, n) {
              return n.some((r) => Hc(e, t, r));
            })(e, n, r)
          ? {
              segmentGroup: new ne(e.segments, vj(e, 0, n, r, e.children)),
              slicedSegments: n,
            }
          : { segmentGroup: new ne(e.segments, e.children), slicedSegments: n };
      }
      function vj(e, t, n, r, i) {
        const o = {};
        for (const s of r)
          if (Hc(e, n, s) && !i[Gt(s)]) {
            const a = new ne([], {});
            o[Gt(s)] = a;
          }
        return { ...i, ...o };
      }
      function Dj(e, t) {
        const n = {};
        n[$] = t;
        for (const r of e)
          if ("" === r.path && Gt(r) !== $) {
            const i = new ne([], {});
            n[Gt(r)] = i;
          }
        return n;
      }
      function Hc(e, t, n) {
        return (
          (!(e.hasChildren() || t.length > 0) || "full" !== n.pathMatch) &&
          "" === n.path
        );
      }
      class Ij {
        constructor(t, n, r, i, o, s, a) {
          (this.injector = t),
            (this.configLoader = n),
            (this.rootComponentType = r),
            (this.config = i),
            (this.urlTree = o),
            (this.paramsInheritanceStrategy = s),
            (this.urlSerializer = a),
            (this.allowRedirects = !0),
            (this.applyRedirects = new yj(this.urlSerializer, this.urlTree));
        }
        noMatchError(t) {
          return new _(4002, !1);
        }
        recognize() {
          const t = lw(this.urlTree.root, [], [], this.config).segmentGroup;
          return this.processSegmentGroup(
            this.injector,
            this.config,
            t,
            $
          ).pipe(
            Kn((n) => {
              if (n instanceof aw)
                return (
                  (this.allowRedirects = !1),
                  (this.urlTree = n.urlTree),
                  this.match(n.urlTree)
                );
              throw n instanceof Bc ? this.noMatchError(n) : n;
            }),
            U((n) => {
              const r = new Fc(
                  [],
                  Object.freeze({}),
                  Object.freeze({ ...this.urlTree.queryParams }),
                  this.urlTree.fragment,
                  {},
                  $,
                  this.rootComponentType,
                  null,
                  {}
                ),
                i = new On(r, n),
                o = new YC("", i),
                s = (function mL(e, t, n = null, r = null) {
                  return BC(jC(e), t, n, r);
                })(r, [], this.urlTree.queryParams, this.urlTree.fragment);
              return (
                (s.queryParams = this.urlTree.queryParams),
                (o.url = this.urlSerializer.serialize(s)),
                this.inheritParamsAndData(o._root),
                { state: o, tree: s }
              );
            })
          );
        }
        match(t) {
          return this.processSegmentGroup(
            this.injector,
            this.config,
            t.root,
            $
          ).pipe(
            Kn((r) => {
              throw r instanceof Bc ? this.noMatchError(r) : r;
            })
          );
        }
        inheritParamsAndData(t) {
          const n = t.value,
            r = QC(n, this.paramsInheritanceStrategy);
          (n.params = Object.freeze(r.params)),
            (n.data = Object.freeze(r.data)),
            t.children.forEach((i) => this.inheritParamsAndData(i));
        }
        processSegmentGroup(t, n, r, i) {
          return 0 === r.segments.length && r.hasChildren()
            ? this.processChildren(t, n, r)
            : this.processSegment(t, n, r, r.segments, i, !0);
        }
        processChildren(t, n, r) {
          const i = [];
          for (const o of Object.keys(r.children))
            "primary" === o ? i.unshift(o) : i.push(o);
          return Re(i).pipe(
            Pi((o) => {
              const s = r.children[o],
                a = (function qL(e, t) {
                  const n = e.filter((r) => Gt(r) === t);
                  return n.push(...e.filter((r) => Gt(r) !== t)), n;
                })(n, o);
              return this.processSegmentGroup(t, a, s, o);
            }),
            (function G1(e, t) {
              return be(
                (function q1(e, t, n, r, i) {
                  return (o, s) => {
                    let a = n,
                      c = t,
                      l = 0;
                    o.subscribe(
                      De(
                        s,
                        (u) => {
                          const d = l++;
                          (c = a ? e(c, u, d) : ((a = !0), u)), r && s.next(c);
                        },
                        i &&
                          (() => {
                            a && s.next(c), s.complete();
                          })
                      )
                    );
                  };
                })(e, t, arguments.length >= 2, !0)
              );
            })((o, s) => (o.push(...s), o)),
            Mc(null),
            (function W1(e, t) {
              const n = arguments.length >= 2;
              return (r) =>
                r.pipe(
                  e ? fn((i, o) => e(i, o, r)) : Fn,
                  oh(1),
                  n ? Mc(t) : bC(() => new wc())
                );
            })(),
            Ne((o) => {
              if (null === o) return $i(r);
              const s = uw(o);
              return (
                (function Sj(e) {
                  e.sort((t, n) =>
                    t.value.outlet === $
                      ? -1
                      : n.value.outlet === $
                      ? 1
                      : t.value.outlet.localeCompare(n.value.outlet)
                  );
                })(s),
                R(s)
              );
            })
          );
        }
        processSegment(t, n, r, i, o, s) {
          return Re(n).pipe(
            Pi((a) =>
              this.processSegmentAgainstRoute(
                a._injector ?? t,
                n,
                a,
                r,
                i,
                o,
                s
              ).pipe(
                Kn((c) => {
                  if (c instanceof Bc) return R(null);
                  throw c;
                })
              )
            ),
            wr((a) => !!a),
            Kn((a) => {
              if (ow(a))
                return (function bj(e, t, n) {
                  return 0 === t.length && !e.children[n];
                })(r, i, o)
                  ? R([])
                  : $i(r);
              throw a;
            })
          );
        }
        processSegmentAgainstRoute(t, n, r, i, o, s, a) {
          return (function wj(e, t, n, r) {
            return (
              !!(Gt(e) === r || (r !== $ && Hc(t, n, e))) &&
              ("**" === e.path || Ch(t, e, n).matched)
            );
          })(r, i, o, s)
            ? void 0 === r.redirectTo
              ? this.matchSegmentAgainstRoute(t, i, r, o, s, a)
              : a && this.allowRedirects
              ? this.expandSegmentAgainstRouteUsingRedirect(t, i, n, r, o, s)
              : $i(i)
            : $i(i);
        }
        expandSegmentAgainstRouteUsingRedirect(t, n, r, i, o, s) {
          return "**" === i.path
            ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(t, r, i, s)
            : this.expandRegularSegmentAgainstRouteUsingRedirect(
                t,
                n,
                r,
                i,
                o,
                s
              );
        }
        expandWildCardWithParamsAgainstRouteUsingRedirect(t, n, r, i) {
          const o = this.applyRedirects.applyRedirectCommands(
            [],
            r.redirectTo,
            {}
          );
          return r.redirectTo.startsWith("/")
            ? cw(o)
            : this.applyRedirects.lineralizeSegments(r, o).pipe(
                Ne((s) => {
                  const a = new ne(s, {});
                  return this.processSegment(t, n, a, s, i, !1);
                })
              );
        }
        expandRegularSegmentAgainstRouteUsingRedirect(t, n, r, i, o, s) {
          const {
            matched: a,
            consumedSegments: c,
            remainingSegments: l,
            positionalParamSegments: u,
          } = Ch(n, i, o);
          if (!a) return $i(n);
          const d = this.applyRedirects.applyRedirectCommands(
            c,
            i.redirectTo,
            u
          );
          return i.redirectTo.startsWith("/")
            ? cw(d)
            : this.applyRedirects
                .lineralizeSegments(i, d)
                .pipe(
                  Ne((f) => this.processSegment(t, r, n, f.concat(l), s, !1))
                );
        }
        matchSegmentAgainstRoute(t, n, r, i, o, s) {
          let a;
          if ("**" === r.path) {
            const c = i.length > 0 ? SC(i).parameters : {};
            (a = R({
              snapshot: new Fc(
                i,
                c,
                Object.freeze({ ...this.urlTree.queryParams }),
                this.urlTree.fragment,
                dw(r),
                Gt(r),
                r.component ?? r._loadedComponent ?? null,
                r,
                fw(r)
              ),
              consumedSegments: [],
              remainingSegments: [],
            })),
              (n.children = {});
          } else
            a = _j(n, r, i, t).pipe(
              U(
                ({
                  matched: c,
                  consumedSegments: l,
                  remainingSegments: u,
                  parameters: d,
                }) =>
                  c
                    ? {
                        snapshot: new Fc(
                          l,
                          d,
                          Object.freeze({ ...this.urlTree.queryParams }),
                          this.urlTree.fragment,
                          dw(r),
                          Gt(r),
                          r.component ?? r._loadedComponent ?? null,
                          r,
                          fw(r)
                        ),
                        consumedSegments: l,
                        remainingSegments: u,
                      }
                    : null
              )
            );
          return a.pipe(
            Qt((c) =>
              null === c
                ? $i(n)
                : this.getChildConfig((t = r._injector ?? t), r, i).pipe(
                    Qt(({ routes: l }) => {
                      const u = r._loadedInjector ?? t,
                        {
                          snapshot: d,
                          consumedSegments: f,
                          remainingSegments: h,
                        } = c,
                        { segmentGroup: p, slicedSegments: g } = lw(n, f, h, l);
                      if (0 === g.length && p.hasChildren())
                        return this.processChildren(u, l, p).pipe(
                          U((v) => (null === v ? null : [new On(d, v)]))
                        );
                      if (0 === l.length && 0 === g.length)
                        return R([new On(d, [])]);
                      const y = Gt(r) === o;
                      return this.processSegment(
                        u,
                        l,
                        p,
                        g,
                        y ? $ : o,
                        !0
                      ).pipe(U((v) => [new On(d, v)]));
                    })
                  )
            )
          );
        }
        getChildConfig(t, n, r) {
          return n.children
            ? R({ routes: n.children, injector: t })
            : n.loadChildren
            ? void 0 !== n._loadedRoutes
              ? R({ routes: n._loadedRoutes, injector: n._loadedInjector })
              : (function hj(e, t, n, r) {
                  const i = t.canLoad;
                  return void 0 === i || 0 === i.length
                    ? R(!0)
                    : R(
                        i.map((s) => {
                          const a = Hi(s, e);
                          return Zn(
                            (function JL(e) {
                              return e && fs(e.canLoad);
                            })(a)
                              ? a.canLoad(t, n)
                              : e.runInContext(() => a(t, n))
                          );
                        })
                      ).pipe(Vi(), sw());
                })(t, n, r).pipe(
                  Ne((i) =>
                    i
                      ? this.configLoader.loadChildren(t, n).pipe(
                          Ae((o) => {
                            (n._loadedRoutes = o.routes),
                              (n._loadedInjector = o.injector);
                          })
                        )
                      : (function mj(e) {
                          return xi(tw(!1, 3));
                        })()
                  )
                )
            : R({ routes: [], injector: t });
        }
      }
      function Tj(e) {
        const t = e.value.routeConfig;
        return t && "" === t.path;
      }
      function uw(e) {
        const t = [],
          n = new Set();
        for (const r of e) {
          if (!Tj(r)) {
            t.push(r);
            continue;
          }
          const i = t.find((o) => r.value.routeConfig === o.value.routeConfig);
          void 0 !== i ? (i.children.push(...r.children), n.add(i)) : t.push(r);
        }
        for (const r of n) {
          const i = uw(r.children);
          t.push(new On(r.value, i));
        }
        return t.filter((r) => !n.has(r));
      }
      function dw(e) {
        return e.data || {};
      }
      function fw(e) {
        return e.resolve || {};
      }
      function hw(e) {
        return "string" == typeof e.title || null === e.title;
      }
      function wh(e) {
        return Qt((t) => {
          const n = e(t);
          return n ? Re(n).pipe(U(() => t)) : R(t);
        });
      }
      const Ui = new E("ROUTES");
      let bh = (() => {
        class e {
          constructor() {
            (this.componentLoaders = new WeakMap()),
              (this.childrenLoaders = new WeakMap()),
              (this.compiler = M(KD));
          }
          loadComponent(n) {
            if (this.componentLoaders.get(n))
              return this.componentLoaders.get(n);
            if (n._loadedComponent) return R(n._loadedComponent);
            this.onLoadStartListener && this.onLoadStartListener(n);
            const r = Zn(n.loadComponent()).pipe(
                U(pw),
                Ae((o) => {
                  this.onLoadEndListener && this.onLoadEndListener(n),
                    (n._loadedComponent = o);
                }),
                Ic(() => {
                  this.componentLoaders.delete(n);
                })
              ),
              i = new CC(r, () => new bt()).pipe(ih());
            return this.componentLoaders.set(n, i), i;
          }
          loadChildren(n, r) {
            if (this.childrenLoaders.get(r)) return this.childrenLoaders.get(r);
            if (r._loadedRoutes)
              return R({
                routes: r._loadedRoutes,
                injector: r._loadedInjector,
              });
            this.onLoadStartListener && this.onLoadStartListener(r);
            const o = (function Fj(e, t, n, r) {
                return Zn(e.loadChildren()).pipe(
                  U(pw),
                  Ne((i) =>
                    i instanceof eD || Array.isArray(i)
                      ? R(i)
                      : Re(t.compileModuleAsync(i))
                  ),
                  U((i) => {
                    r && r(e);
                    let o,
                      s,
                      a = !1;
                    return (
                      Array.isArray(i)
                        ? ((s = i), !0)
                        : ((o = i.create(n).injector),
                          (s = o
                            .get(Ui, [], { optional: !0, self: !0 })
                            .flat())),
                      { routes: s.map(Dh), injector: o }
                    );
                  })
                );
              })(r, this.compiler, n, this.onLoadEndListener).pipe(
                Ic(() => {
                  this.childrenLoaders.delete(r);
                })
              ),
              s = new CC(o, () => new bt()).pipe(ih());
            return this.childrenLoaders.set(r, s), s;
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵprov = T({
            token: e,
            factory: e.ɵfac,
            providedIn: "root",
          }));
        }
        return e;
      })();
      function pw(e) {
        return (function kj(e) {
          return e && "object" == typeof e && "default" in e;
        })(e)
          ? e.default
          : e;
      }
      let Vc = (() => {
        class e {
          get hasRequestedNavigation() {
            return 0 !== this.navigationId;
          }
          constructor() {
            (this.currentNavigation = null),
              (this.currentTransition = null),
              (this.lastSuccessfulNavigation = null),
              (this.events = new bt()),
              (this.transitionAbortSubject = new bt()),
              (this.configLoader = M(bh)),
              (this.environmentInjector = M(Ot)),
              (this.urlSerializer = M(ts)),
              (this.rootContexts = M(as)),
              (this.inputBindingEnabled = null !== M(kc, { optional: !0 })),
              (this.navigationId = 0),
              (this.afterPreactivation = () => R(void 0)),
              (this.rootComponentType = null),
              (this.configLoader.onLoadEndListener = (i) =>
                this.events.next(new TL(i))),
              (this.configLoader.onLoadStartListener = (i) =>
                this.events.next(new SL(i)));
          }
          complete() {
            this.transitions?.complete();
          }
          handleNavigationRequest(n) {
            const r = ++this.navigationId;
            this.transitions?.next({ ...this.transitions.value, ...n, id: r });
          }
          setupNavigations(n, r, i) {
            return (
              (this.transitions = new Mt({
                id: 0,
                currentUrlTree: r,
                currentRawUrl: r,
                currentBrowserUrl: r,
                extractedUrl: n.urlHandlingStrategy.extract(r),
                urlAfterRedirects: n.urlHandlingStrategy.extract(r),
                rawUrl: r,
                extras: {},
                resolve: null,
                reject: null,
                promise: Promise.resolve(!0),
                source: os,
                restoredState: null,
                currentSnapshot: i.snapshot,
                targetSnapshot: null,
                currentRouterState: i,
                targetRouterState: null,
                guards: { canActivateChecks: [], canDeactivateChecks: [] },
                guardsResult: null,
              })),
              this.transitions.pipe(
                fn((o) => 0 !== o.id),
                U((o) => ({
                  ...o,
                  extractedUrl: n.urlHandlingStrategy.extract(o.rawUrl),
                })),
                Qt((o) => {
                  this.currentTransition = o;
                  let s = !1,
                    a = !1;
                  return R(o).pipe(
                    Ae((c) => {
                      this.currentNavigation = {
                        id: c.id,
                        initialUrl: c.rawUrl,
                        extractedUrl: c.extractedUrl,
                        trigger: c.source,
                        extras: c.extras,
                        previousNavigation: this.lastSuccessfulNavigation
                          ? {
                              ...this.lastSuccessfulNavigation,
                              previousNavigation: null,
                            }
                          : null,
                      };
                    }),
                    Qt((c) => {
                      const l = c.currentBrowserUrl.toString(),
                        u =
                          !n.navigated ||
                          c.extractedUrl.toString() !== l ||
                          l !== c.currentUrlTree.toString();
                      if (
                        !u &&
                        "reload" !==
                          (c.extras.onSameUrlNavigation ??
                            n.onSameUrlNavigation)
                      ) {
                        const f = "";
                        return (
                          this.events.next(
                            new Li(
                              c.id,
                              this.urlSerializer.serialize(c.rawUrl),
                              f,
                              0
                            )
                          ),
                          c.resolve(null),
                          Zt
                        );
                      }
                      if (n.urlHandlingStrategy.shouldProcessUrl(c.rawUrl))
                        return R(c).pipe(
                          Qt((f) => {
                            const h = this.transitions?.getValue();
                            return (
                              this.events.next(
                                new xc(
                                  f.id,
                                  this.urlSerializer.serialize(f.extractedUrl),
                                  f.source,
                                  f.restoredState
                                )
                              ),
                              h !== this.transitions?.getValue()
                                ? Zt
                                : Promise.resolve(f)
                            );
                          }),
                          (function Aj(e, t, n, r, i, o) {
                            return Ne((s) =>
                              (function Mj(e, t, n, r, i, o, s = "emptyOnly") {
                                return new Ij(e, t, n, r, i, s, o).recognize();
                              })(e, t, n, r, s.extractedUrl, i, o).pipe(
                                U(({ state: a, tree: c }) => ({
                                  ...s,
                                  targetSnapshot: a,
                                  urlAfterRedirects: c,
                                }))
                              )
                            );
                          })(
                            this.environmentInjector,
                            this.configLoader,
                            this.rootComponentType,
                            n.config,
                            this.urlSerializer,
                            n.paramsInheritanceStrategy
                          ),
                          Ae((f) => {
                            (o.targetSnapshot = f.targetSnapshot),
                              (o.urlAfterRedirects = f.urlAfterRedirects),
                              (this.currentNavigation = {
                                ...this.currentNavigation,
                                finalUrl: f.urlAfterRedirects,
                              });
                            const h = new qC(
                              f.id,
                              this.urlSerializer.serialize(f.extractedUrl),
                              this.urlSerializer.serialize(f.urlAfterRedirects),
                              f.targetSnapshot
                            );
                            this.events.next(h);
                          })
                        );
                      if (
                        u &&
                        n.urlHandlingStrategy.shouldProcessUrl(c.currentRawUrl)
                      ) {
                        const {
                            id: f,
                            extractedUrl: h,
                            source: p,
                            restoredState: g,
                            extras: y,
                          } = c,
                          v = new xc(f, this.urlSerializer.serialize(h), p, g);
                        this.events.next(v);
                        const m = ZC(0, this.rootComponentType).snapshot;
                        return (
                          (this.currentTransition = o =
                            {
                              ...c,
                              targetSnapshot: m,
                              urlAfterRedirects: h,
                              extras: {
                                ...y,
                                skipLocationChange: !1,
                                replaceUrl: !1,
                              },
                            }),
                          R(o)
                        );
                      }
                      {
                        const f = "";
                        return (
                          this.events.next(
                            new Li(
                              c.id,
                              this.urlSerializer.serialize(c.extractedUrl),
                              f,
                              1
                            )
                          ),
                          c.resolve(null),
                          Zt
                        );
                      }
                    }),
                    Ae((c) => {
                      const l = new wL(
                        c.id,
                        this.urlSerializer.serialize(c.extractedUrl),
                        this.urlSerializer.serialize(c.urlAfterRedirects),
                        c.targetSnapshot
                      );
                      this.events.next(l);
                    }),
                    U(
                      (c) => (
                        (this.currentTransition = o =
                          {
                            ...c,
                            guards: KL(
                              c.targetSnapshot,
                              c.currentSnapshot,
                              this.rootContexts
                            ),
                          }),
                        o
                      )
                    ),
                    (function oj(e, t) {
                      return Ne((n) => {
                        const {
                          targetSnapshot: r,
                          currentSnapshot: i,
                          guards: {
                            canActivateChecks: o,
                            canDeactivateChecks: s,
                          },
                        } = n;
                        return 0 === s.length && 0 === o.length
                          ? R({ ...n, guardsResult: !0 })
                          : (function sj(e, t, n, r) {
                              return Re(e).pipe(
                                Ne((i) =>
                                  (function fj(e, t, n, r, i) {
                                    const o =
                                      t && t.routeConfig
                                        ? t.routeConfig.canDeactivate
                                        : null;
                                    return o && 0 !== o.length
                                      ? R(
                                          o.map((a) => {
                                            const c = ls(t) ?? i,
                                              l = Hi(a, c);
                                            return Zn(
                                              (function nj(e) {
                                                return e && fs(e.canDeactivate);
                                              })(l)
                                                ? l.canDeactivate(e, t, n, r)
                                                : c.runInContext(() =>
                                                    l(e, t, n, r)
                                                  )
                                            ).pipe(wr());
                                          })
                                        ).pipe(Vi())
                                      : R(!0);
                                  })(i.component, i.route, n, t, r)
                                ),
                                wr((i) => !0 !== i, !0)
                              );
                            })(s, r, i, e).pipe(
                              Ne((a) =>
                                a &&
                                (function XL(e) {
                                  return "boolean" == typeof e;
                                })(a)
                                  ? (function aj(e, t, n, r) {
                                      return Re(t).pipe(
                                        Pi((i) =>
                                          bc(
                                            (function lj(e, t) {
                                              return (
                                                null !== e && t && t(new AL(e)),
                                                R(!0)
                                              );
                                            })(i.route.parent, r),
                                            (function cj(e, t) {
                                              return (
                                                null !== e && t && t(new NL(e)),
                                                R(!0)
                                              );
                                            })(i.route, r),
                                            (function dj(e, t, n) {
                                              const r = t[t.length - 1],
                                                o = t
                                                  .slice(0, t.length - 1)
                                                  .reverse()
                                                  .map((s) =>
                                                    (function ZL(e) {
                                                      const t = e.routeConfig
                                                        ? e.routeConfig
                                                            .canActivateChild
                                                        : null;
                                                      return t && 0 !== t.length
                                                        ? { node: e, guards: t }
                                                        : null;
                                                    })(s)
                                                  )
                                                  .filter((s) => null !== s)
                                                  .map((s) =>
                                                    EC(() =>
                                                      R(
                                                        s.guards.map((c) => {
                                                          const l =
                                                              ls(s.node) ?? n,
                                                            u = Hi(c, l);
                                                          return Zn(
                                                            (function tj(e) {
                                                              return (
                                                                e &&
                                                                fs(
                                                                  e.canActivateChild
                                                                )
                                                              );
                                                            })(u)
                                                              ? u.canActivateChild(
                                                                  r,
                                                                  e
                                                                )
                                                              : l.runInContext(
                                                                  () => u(r, e)
                                                                )
                                                          ).pipe(wr());
                                                        })
                                                      ).pipe(Vi())
                                                    )
                                                  );
                                              return R(o).pipe(Vi());
                                            })(e, i.path, n),
                                            (function uj(e, t, n) {
                                              const r = t.routeConfig
                                                ? t.routeConfig.canActivate
                                                : null;
                                              if (!r || 0 === r.length)
                                                return R(!0);
                                              const i = r.map((o) =>
                                                EC(() => {
                                                  const s = ls(t) ?? n,
                                                    a = Hi(o, s);
                                                  return Zn(
                                                    (function ej(e) {
                                                      return (
                                                        e && fs(e.canActivate)
                                                      );
                                                    })(a)
                                                      ? a.canActivate(t, e)
                                                      : s.runInContext(() =>
                                                          a(t, e)
                                                        )
                                                  ).pipe(wr());
                                                })
                                              );
                                              return R(i).pipe(Vi());
                                            })(e, i.route, n)
                                          )
                                        ),
                                        wr((i) => !0 !== i, !0)
                                      );
                                    })(r, o, e, t)
                                  : R(a)
                              ),
                              U((a) => ({ ...n, guardsResult: a }))
                            );
                      });
                    })(this.environmentInjector, (c) => this.events.next(c)),
                    Ae((c) => {
                      if (
                        ((o.guardsResult = c.guardsResult), Mr(c.guardsResult))
                      )
                        throw ew(0, c.guardsResult);
                      const l = new bL(
                        c.id,
                        this.urlSerializer.serialize(c.extractedUrl),
                        this.urlSerializer.serialize(c.urlAfterRedirects),
                        c.targetSnapshot,
                        !!c.guardsResult
                      );
                      this.events.next(l);
                    }),
                    fn(
                      (c) =>
                        !!c.guardsResult ||
                        (this.cancelNavigationTransition(c, "", 3), !1)
                    ),
                    wh((c) => {
                      if (c.guards.canActivateChecks.length)
                        return R(c).pipe(
                          Ae((l) => {
                            const u = new ML(
                              l.id,
                              this.urlSerializer.serialize(l.extractedUrl),
                              this.urlSerializer.serialize(l.urlAfterRedirects),
                              l.targetSnapshot
                            );
                            this.events.next(u);
                          }),
                          Qt((l) => {
                            let u = !1;
                            return R(l).pipe(
                              (function Oj(e, t) {
                                return Ne((n) => {
                                  const {
                                    targetSnapshot: r,
                                    guards: { canActivateChecks: i },
                                  } = n;
                                  if (!i.length) return R(n);
                                  let o = 0;
                                  return Re(i).pipe(
                                    Pi((s) =>
                                      (function Nj(e, t, n, r) {
                                        const i = e.routeConfig,
                                          o = e._resolve;
                                        return (
                                          void 0 !== i?.title &&
                                            !hw(i) &&
                                            (o[Jo] = i.title),
                                          (function Rj(e, t, n, r) {
                                            const i = (function xj(e) {
                                              return [
                                                ...Object.keys(e),
                                                ...Object.getOwnPropertySymbols(
                                                  e
                                                ),
                                              ];
                                            })(e);
                                            if (0 === i.length) return R({});
                                            const o = {};
                                            return Re(i).pipe(
                                              Ne((s) =>
                                                (function Pj(e, t, n, r) {
                                                  const i = ls(t) ?? r,
                                                    o = Hi(e, i);
                                                  return Zn(
                                                    o.resolve
                                                      ? o.resolve(t, n)
                                                      : i.runInContext(() =>
                                                          o(t, n)
                                                        )
                                                  );
                                                })(e[s], t, n, r).pipe(
                                                  wr(),
                                                  Ae((a) => {
                                                    o[s] = a;
                                                  })
                                                )
                                              ),
                                              oh(1),
                                              (function K1(e) {
                                                return U(() => e);
                                              })(o),
                                              Kn((s) => (ow(s) ? Zt : xi(s)))
                                            );
                                          })(o, e, t, r).pipe(
                                            U(
                                              (s) => (
                                                (e._resolvedData = s),
                                                (e.data = QC(e, n).resolve),
                                                i &&
                                                  hw(i) &&
                                                  (e.data[Jo] = i.title),
                                                null
                                              )
                                            )
                                          )
                                        );
                                      })(s.route, r, e, t)
                                    ),
                                    Ae(() => o++),
                                    oh(1),
                                    Ne((s) => (o === i.length ? R(n) : Zt))
                                  );
                                });
                              })(
                                n.paramsInheritanceStrategy,
                                this.environmentInjector
                              ),
                              Ae({
                                next: () => (u = !0),
                                complete: () => {
                                  u ||
                                    this.cancelNavigationTransition(l, "", 2);
                                },
                              })
                            );
                          }),
                          Ae((l) => {
                            const u = new IL(
                              l.id,
                              this.urlSerializer.serialize(l.extractedUrl),
                              this.urlSerializer.serialize(l.urlAfterRedirects),
                              l.targetSnapshot
                            );
                            this.events.next(u);
                          })
                        );
                    }),
                    wh((c) => {
                      const l = (u) => {
                        const d = [];
                        u.routeConfig?.loadComponent &&
                          !u.routeConfig._loadedComponent &&
                          d.push(
                            this.configLoader.loadComponent(u.routeConfig).pipe(
                              Ae((f) => {
                                u.component = f;
                              }),
                              U(() => {})
                            )
                          );
                        for (const f of u.children) d.push(...l(f));
                        return d;
                      };
                      return Cc(l(c.targetSnapshot.root)).pipe(Mc(), Wn(1));
                    }),
                    wh(() => this.afterPreactivation()),
                    U((c) => {
                      const l = (function LL(e, t, n) {
                        const r = cs(e, t._root, n ? n._root : void 0);
                        return new KC(r, t);
                      })(
                        n.routeReuseStrategy,
                        c.targetSnapshot,
                        c.currentRouterState
                      );
                      return (
                        (this.currentTransition = o =
                          { ...c, targetRouterState: l }),
                        o
                      );
                    }),
                    Ae(() => {
                      this.events.next(new dh());
                    }),
                    ((e, t, n, r) =>
                      U(
                        (i) => (
                          new WL(
                            t,
                            i.targetRouterState,
                            i.currentRouterState,
                            n,
                            r
                          ).activate(e),
                          i
                        )
                      ))(
                      this.rootContexts,
                      n.routeReuseStrategy,
                      (c) => this.events.next(c),
                      this.inputBindingEnabled
                    ),
                    Wn(1),
                    Ae({
                      next: (c) => {
                        (s = !0),
                          (this.lastSuccessfulNavigation =
                            this.currentNavigation),
                          this.events.next(
                            new Qn(
                              c.id,
                              this.urlSerializer.serialize(c.extractedUrl),
                              this.urlSerializer.serialize(c.urlAfterRedirects)
                            )
                          ),
                          n.titleStrategy?.updateTitle(
                            c.targetRouterState.snapshot
                          ),
                          c.resolve(!0);
                      },
                      complete: () => {
                        s = !0;
                      },
                    }),
                    MC(
                      this.transitionAbortSubject.pipe(
                        Ae((c) => {
                          throw c;
                        })
                      )
                    ),
                    Ic(() => {
                      s || a || this.cancelNavigationTransition(o, "", 1),
                        this.currentNavigation?.id === o.id &&
                          (this.currentNavigation = null);
                    }),
                    Kn((c) => {
                      if (((a = !0), nw(c)))
                        this.events.next(
                          new ss(
                            o.id,
                            this.urlSerializer.serialize(o.extractedUrl),
                            c.message,
                            c.cancellationCode
                          )
                        ),
                          (function HL(e) {
                            return nw(e) && Mr(e.url);
                          })(c)
                            ? this.events.next(new fh(c.url))
                            : o.resolve(!1);
                      else {
                        this.events.next(
                          new Pc(
                            o.id,
                            this.urlSerializer.serialize(o.extractedUrl),
                            c,
                            o.targetSnapshot ?? void 0
                          )
                        );
                        try {
                          o.resolve(n.errorHandler(c));
                        } catch (l) {
                          o.reject(l);
                        }
                      }
                      return Zt;
                    })
                  );
                })
              )
            );
          }
          cancelNavigationTransition(n, r, i) {
            const o = new ss(
              n.id,
              this.urlSerializer.serialize(n.extractedUrl),
              r,
              i
            );
            this.events.next(o), n.resolve(!1);
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵprov = T({
            token: e,
            factory: e.ɵfac,
            providedIn: "root",
          }));
        }
        return e;
      })();
      function gw(e) {
        return e !== os;
      }
      let mw = (() => {
          class e {
            buildTitle(n) {
              let r,
                i = n.root;
              for (; void 0 !== i; )
                (r = this.getResolvedTitleForRoute(i) ?? r),
                  (i = i.children.find((o) => o.outlet === $));
              return r;
            }
            getResolvedTitleForRoute(n) {
              return n.data[Jo];
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵprov = T({
              token: e,
              factory: function () {
                return M(Lj);
              },
              providedIn: "root",
            }));
          }
          return e;
        })(),
        Lj = (() => {
          class e extends mw {
            constructor(n) {
              super(), (this.title = n);
            }
            updateTitle(n) {
              const r = this.buildTitle(n);
              void 0 !== r && this.title.setTitle(r);
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(C(fC));
            });
            static #t = (this.ɵprov = T({
              token: e,
              factory: e.ɵfac,
              providedIn: "root",
            }));
          }
          return e;
        })(),
        jj = (() => {
          class e {
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵprov = T({
              token: e,
              factory: function () {
                return M(Hj);
              },
              providedIn: "root",
            }));
          }
          return e;
        })();
      class Bj {
        shouldDetach(t) {
          return !1;
        }
        store(t, n) {}
        shouldAttach(t) {
          return !1;
        }
        retrieve(t) {
          return null;
        }
        shouldReuseRoute(t, n) {
          return t.routeConfig === n.routeConfig;
        }
      }
      let Hj = (() => {
        class e extends Bj {
          static #e = (this.ɵfac = (function () {
            let n;
            return function (i) {
              return (
                n ||
                (n = (function tm(e) {
                  return _n(() => {
                    const t = e.prototype.constructor,
                      n = t[vn] || hu(t),
                      r = Object.prototype;
                    let i = Object.getPrototypeOf(e.prototype).constructor;
                    for (; i && i !== r; ) {
                      const o = i[vn] || hu(i);
                      if (o && o !== n) return o;
                      i = Object.getPrototypeOf(i);
                    }
                    return (o) => new o();
                  });
                })(e))
              )(i || e);
            };
          })());
          static #t = (this.ɵprov = T({
            token: e,
            factory: e.ɵfac,
            providedIn: "root",
          }));
        }
        return e;
      })();
      const $c = new E("", { providedIn: "root", factory: () => ({}) });
      let Vj = (() => {
          class e {
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵprov = T({
              token: e,
              factory: function () {
                return M($j);
              },
              providedIn: "root",
            }));
          }
          return e;
        })(),
        $j = (() => {
          class e {
            shouldProcessUrl(n) {
              return !0;
            }
            extract(n) {
              return n;
            }
            merge(n, r) {
              return n;
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵprov = T({
              token: e,
              factory: e.ɵfac,
              providedIn: "root",
            }));
          }
          return e;
        })();
      var hs = (function (e) {
        return (
          (e[(e.COMPLETE = 0)] = "COMPLETE"),
          (e[(e.FAILED = 1)] = "FAILED"),
          (e[(e.REDIRECTING = 2)] = "REDIRECTING"),
          e
        );
      })(hs || {});
      function yw(e, t) {
        e.events
          .pipe(
            fn(
              (n) =>
                n instanceof Qn ||
                n instanceof ss ||
                n instanceof Pc ||
                n instanceof Li
            ),
            U((n) =>
              n instanceof Qn || n instanceof Li
                ? hs.COMPLETE
                : n instanceof ss && (0 === n.code || 1 === n.code)
                ? hs.REDIRECTING
                : hs.FAILED
            ),
            fn((n) => n !== hs.REDIRECTING),
            Wn(1)
          )
          .subscribe(() => {
            t();
          });
      }
      function Uj(e) {
        throw e;
      }
      function zj(e, t, n) {
        return t.parse("/");
      }
      const qj = {
          paths: "exact",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "exact",
        },
        Gj = {
          paths: "subset",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "subset",
        };
      let Ft = (() => {
        class e {
          get navigationId() {
            return this.navigationTransitions.navigationId;
          }
          get browserPageId() {
            return "computed" !== this.canceledNavigationResolution
              ? this.currentPageId
              : this.location.getState()?.ɵrouterPageId ?? this.currentPageId;
          }
          get events() {
            return this._events;
          }
          constructor() {
            (this.disposed = !1),
              (this.currentPageId = 0),
              (this.console = M(GD)),
              (this.isNgZoneEnabled = !1),
              (this._events = new bt()),
              (this.options = M($c, { optional: !0 }) || {}),
              (this.pendingTasks = M(WD)),
              (this.errorHandler = this.options.errorHandler || Uj),
              (this.malformedUriErrorHandler =
                this.options.malformedUriErrorHandler || zj),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1),
              (this.urlHandlingStrategy = M(Vj)),
              (this.routeReuseStrategy = M(jj)),
              (this.titleStrategy = M(mw)),
              (this.onSameUrlNavigation =
                this.options.onSameUrlNavigation || "ignore"),
              (this.paramsInheritanceStrategy =
                this.options.paramsInheritanceStrategy || "emptyOnly"),
              (this.urlUpdateStrategy =
                this.options.urlUpdateStrategy || "deferred"),
              (this.canceledNavigationResolution =
                this.options.canceledNavigationResolution || "replace"),
              (this.config = M(Ui, { optional: !0 })?.flat() ?? []),
              (this.navigationTransitions = M(Vc)),
              (this.urlSerializer = M(ts)),
              (this.location = M(Af)),
              (this.componentInputBindingEnabled = !!M(kc, { optional: !0 })),
              (this.eventsSubscription = new Ue()),
              (this.isNgZoneEnabled =
                M(te) instanceof te && te.isInAngularZone()),
              this.resetConfig(this.config),
              (this.currentUrlTree = new ki()),
              (this.rawUrlTree = this.currentUrlTree),
              (this.browserUrlTree = this.currentUrlTree),
              (this.routerState = ZC(0, null)),
              this.navigationTransitions
                .setupNavigations(this, this.currentUrlTree, this.routerState)
                .subscribe(
                  (n) => {
                    (this.lastSuccessfulId = n.id),
                      (this.currentPageId = this.browserPageId);
                  },
                  (n) => {
                    this.console.warn(`Unhandled Navigation Error: ${n}`);
                  }
                ),
              this.subscribeToNavigationEvents();
          }
          subscribeToNavigationEvents() {
            const n = this.navigationTransitions.events.subscribe((r) => {
              try {
                const { currentTransition: i } = this.navigationTransitions;
                if (null === i) return void (_w(r) && this._events.next(r));
                if (r instanceof xc)
                  gw(i.source) && (this.browserUrlTree = i.extractedUrl);
                else if (r instanceof Li) this.rawUrlTree = i.rawUrl;
                else if (r instanceof qC) {
                  if ("eager" === this.urlUpdateStrategy) {
                    if (!i.extras.skipLocationChange) {
                      const o = this.urlHandlingStrategy.merge(
                        i.urlAfterRedirects,
                        i.rawUrl
                      );
                      this.setBrowserUrl(o, i);
                    }
                    this.browserUrlTree = i.urlAfterRedirects;
                  }
                } else if (r instanceof dh)
                  (this.currentUrlTree = i.urlAfterRedirects),
                    (this.rawUrlTree = this.urlHandlingStrategy.merge(
                      i.urlAfterRedirects,
                      i.rawUrl
                    )),
                    (this.routerState = i.targetRouterState),
                    "deferred" === this.urlUpdateStrategy &&
                      (i.extras.skipLocationChange ||
                        this.setBrowserUrl(this.rawUrlTree, i),
                      (this.browserUrlTree = i.urlAfterRedirects));
                else if (r instanceof ss)
                  0 !== r.code && 1 !== r.code && (this.navigated = !0),
                    (3 === r.code || 2 === r.code) && this.restoreHistory(i);
                else if (r instanceof fh) {
                  const o = this.urlHandlingStrategy.merge(
                      r.url,
                      i.currentRawUrl
                    ),
                    s = {
                      skipLocationChange: i.extras.skipLocationChange,
                      replaceUrl:
                        "eager" === this.urlUpdateStrategy || gw(i.source),
                    };
                  this.scheduleNavigation(o, os, null, s, {
                    resolve: i.resolve,
                    reject: i.reject,
                    promise: i.promise,
                  });
                }
                r instanceof Pc && this.restoreHistory(i, !0),
                  r instanceof Qn && (this.navigated = !0),
                  _w(r) && this._events.next(r);
              } catch (i) {
                this.navigationTransitions.transitionAbortSubject.next(i);
              }
            });
            this.eventsSubscription.add(n);
          }
          resetRootComponentType(n) {
            (this.routerState.root.component = n),
              (this.navigationTransitions.rootComponentType = n);
          }
          initialNavigation() {
            if (
              (this.setUpLocationChangeListener(),
              !this.navigationTransitions.hasRequestedNavigation)
            ) {
              const n = this.location.getState();
              this.navigateToSyncWithBrowser(this.location.path(!0), os, n);
            }
          }
          setUpLocationChangeListener() {
            this.locationSubscription ||
              (this.locationSubscription = this.location.subscribe((n) => {
                const r = "popstate" === n.type ? "popstate" : "hashchange";
                "popstate" === r &&
                  setTimeout(() => {
                    this.navigateToSyncWithBrowser(n.url, r, n.state);
                  }, 0);
              }));
          }
          navigateToSyncWithBrowser(n, r, i) {
            const o = { replaceUrl: !0 },
              s = i?.navigationId ? i : null;
            if (i) {
              const c = { ...i };
              delete c.navigationId,
                delete c.ɵrouterPageId,
                0 !== Object.keys(c).length && (o.state = c);
            }
            const a = this.parseUrl(n);
            this.scheduleNavigation(a, r, s, o);
          }
          get url() {
            return this.serializeUrl(this.currentUrlTree);
          }
          getCurrentNavigation() {
            return this.navigationTransitions.currentNavigation;
          }
          get lastSuccessfulNavigation() {
            return this.navigationTransitions.lastSuccessfulNavigation;
          }
          resetConfig(n) {
            (this.config = n.map(Dh)),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1);
          }
          ngOnDestroy() {
            this.dispose();
          }
          dispose() {
            this.navigationTransitions.complete(),
              this.locationSubscription &&
                (this.locationSubscription.unsubscribe(),
                (this.locationSubscription = void 0)),
              (this.disposed = !0),
              this.eventsSubscription.unsubscribe();
          }
          createUrlTree(n, r = {}) {
            const {
                relativeTo: i,
                queryParams: o,
                fragment: s,
                queryParamsHandling: a,
                preserveFragment: c,
              } = r,
              l = c ? this.currentUrlTree.fragment : s;
            let d,
              u = null;
            switch (a) {
              case "merge":
                u = { ...this.currentUrlTree.queryParams, ...o };
                break;
              case "preserve":
                u = this.currentUrlTree.queryParams;
                break;
              default:
                u = o || null;
            }
            null !== u && (u = this.removeEmptyProps(u));
            try {
              d = jC(i ? i.snapshot : this.routerState.snapshot.root);
            } catch {
              ("string" != typeof n[0] || !n[0].startsWith("/")) && (n = []),
                (d = this.currentUrlTree.root);
            }
            return BC(d, n, u, l ?? null);
          }
          navigateByUrl(n, r = { skipLocationChange: !1 }) {
            const i = Mr(n) ? n : this.parseUrl(n),
              o = this.urlHandlingStrategy.merge(i, this.rawUrlTree);
            return this.scheduleNavigation(o, os, null, r);
          }
          navigate(n, r = { skipLocationChange: !1 }) {
            return (
              (function Wj(e) {
                for (let t = 0; t < e.length; t++)
                  if (null == e[t]) throw new _(4008, !1);
              })(n),
              this.navigateByUrl(this.createUrlTree(n, r), r)
            );
          }
          serializeUrl(n) {
            return this.urlSerializer.serialize(n);
          }
          parseUrl(n) {
            let r;
            try {
              r = this.urlSerializer.parse(n);
            } catch (i) {
              r = this.malformedUriErrorHandler(i, this.urlSerializer, n);
            }
            return r;
          }
          isActive(n, r) {
            let i;
            if (((i = !0 === r ? { ...qj } : !1 === r ? { ...Gj } : r), Mr(n)))
              return AC(this.currentUrlTree, n, i);
            const o = this.parseUrl(n);
            return AC(this.currentUrlTree, o, i);
          }
          removeEmptyProps(n) {
            return Object.keys(n).reduce((r, i) => {
              const o = n[i];
              return null != o && (r[i] = o), r;
            }, {});
          }
          scheduleNavigation(n, r, i, o, s) {
            if (this.disposed) return Promise.resolve(!1);
            let a, c, l;
            s
              ? ((a = s.resolve), (c = s.reject), (l = s.promise))
              : (l = new Promise((d, f) => {
                  (a = d), (c = f);
                }));
            const u = this.pendingTasks.add();
            return (
              yw(this, () => {
                queueMicrotask(() => this.pendingTasks.remove(u));
              }),
              this.navigationTransitions.handleNavigationRequest({
                source: r,
                restoredState: i,
                currentUrlTree: this.currentUrlTree,
                currentRawUrl: this.currentUrlTree,
                currentBrowserUrl: this.browserUrlTree,
                rawUrl: n,
                extras: o,
                resolve: a,
                reject: c,
                promise: l,
                currentSnapshot: this.routerState.snapshot,
                currentRouterState: this.routerState,
              }),
              l.catch((d) => Promise.reject(d))
            );
          }
          setBrowserUrl(n, r) {
            const i = this.urlSerializer.serialize(n);
            if (this.location.isCurrentPathEqualTo(i) || r.extras.replaceUrl) {
              const s = {
                ...r.extras.state,
                ...this.generateNgRouterState(r.id, this.browserPageId),
              };
              this.location.replaceState(i, "", s);
            } else {
              const o = {
                ...r.extras.state,
                ...this.generateNgRouterState(r.id, this.browserPageId + 1),
              };
              this.location.go(i, "", o);
            }
          }
          restoreHistory(n, r = !1) {
            if ("computed" === this.canceledNavigationResolution) {
              const o = this.currentPageId - this.browserPageId;
              0 !== o
                ? this.location.historyGo(o)
                : this.currentUrlTree ===
                    this.getCurrentNavigation()?.finalUrl &&
                  0 === o &&
                  (this.resetState(n),
                  (this.browserUrlTree = n.currentUrlTree),
                  this.resetUrlToCurrentUrlTree());
            } else
              "replace" === this.canceledNavigationResolution &&
                (r && this.resetState(n), this.resetUrlToCurrentUrlTree());
          }
          resetState(n) {
            (this.routerState = n.currentRouterState),
              (this.currentUrlTree = n.currentUrlTree),
              (this.rawUrlTree = this.urlHandlingStrategy.merge(
                this.currentUrlTree,
                n.rawUrl
              ));
          }
          resetUrlToCurrentUrlTree() {
            this.location.replaceState(
              this.urlSerializer.serialize(this.rawUrlTree),
              "",
              this.generateNgRouterState(
                this.lastSuccessfulId,
                this.currentPageId
              )
            );
          }
          generateNgRouterState(n, r) {
            return "computed" === this.canceledNavigationResolution
              ? { navigationId: n, ɵrouterPageId: r }
              : { navigationId: n };
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵprov = T({
            token: e,
            factory: e.ɵfac,
            providedIn: "root",
          }));
        }
        return e;
      })();
      function _w(e) {
        return !(e instanceof dh || e instanceof fh);
      }
      let Uc = (() => {
        class e {
          constructor(n, r, i, o, s, a) {
            (this.router = n),
              (this.route = r),
              (this.tabIndexAttribute = i),
              (this.renderer = o),
              (this.el = s),
              (this.locationStrategy = a),
              (this.href = null),
              (this.commands = null),
              (this.onChanges = new bt()),
              (this.preserveFragment = !1),
              (this.skipLocationChange = !1),
              (this.replaceUrl = !1);
            const c = s.nativeElement.tagName?.toLowerCase();
            (this.isAnchorElement = "a" === c || "area" === c),
              this.isAnchorElement
                ? (this.subscription = n.events.subscribe((l) => {
                    l instanceof Qn && this.updateHref();
                  }))
                : this.setTabIndexIfNotOnNativeEl("0");
          }
          setTabIndexIfNotOnNativeEl(n) {
            null != this.tabIndexAttribute ||
              this.isAnchorElement ||
              this.applyAttributeValue("tabindex", n);
          }
          ngOnChanges(n) {
            this.isAnchorElement && this.updateHref(),
              this.onChanges.next(this);
          }
          set routerLink(n) {
            null != n
              ? ((this.commands = Array.isArray(n) ? n : [n]),
                this.setTabIndexIfNotOnNativeEl("0"))
              : ((this.commands = null), this.setTabIndexIfNotOnNativeEl(null));
          }
          onClick(n, r, i, o, s) {
            return (
              !!(
                null === this.urlTree ||
                (this.isAnchorElement &&
                  (0 !== n ||
                    r ||
                    i ||
                    o ||
                    s ||
                    ("string" == typeof this.target && "_self" != this.target)))
              ) ||
              (this.router.navigateByUrl(this.urlTree, {
                skipLocationChange: this.skipLocationChange,
                replaceUrl: this.replaceUrl,
                state: this.state,
              }),
              !this.isAnchorElement)
            );
          }
          ngOnDestroy() {
            this.subscription?.unsubscribe();
          }
          updateHref() {
            this.href =
              null !== this.urlTree && this.locationStrategy
                ? this.locationStrategy?.prepareExternalUrl(
                    this.router.serializeUrl(this.urlTree)
                  )
                : null;
            const n =
              null === this.href
                ? null
                : (function Jm(e, t, n) {
                    return (function vT(e, t) {
                      return ("src" === t &&
                        ("embed" === e ||
                          "frame" === e ||
                          "iframe" === e ||
                          "media" === e ||
                          "script" === e)) ||
                        ("href" === t && ("base" === e || "link" === e))
                        ? Xm
                        : ya;
                    })(
                      t,
                      n
                    )(e);
                  })(
                    this.href,
                    this.el.nativeElement.tagName.toLowerCase(),
                    "href"
                  );
            this.applyAttributeValue("href", n);
          }
          applyAttributeValue(n, r) {
            const i = this.renderer,
              o = this.el.nativeElement;
            null !== r ? i.setAttribute(o, n, r) : i.removeAttribute(o, n);
          }
          get urlTree() {
            return null === this.commands
              ? null
              : this.router.createUrlTree(this.commands, {
                  relativeTo:
                    void 0 !== this.relativeTo ? this.relativeTo : this.route,
                  queryParams: this.queryParams,
                  fragment: this.fragment,
                  queryParamsHandling: this.queryParamsHandling,
                  preserveFragment: this.preserveFragment,
                });
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(
              O(Ft),
              O(Bi),
              ho("tabindex"),
              O(Ta),
              O(on),
              O(Cr)
            );
          });
          static #t = (this.ɵdir = ze({
            type: e,
            selectors: [["", "routerLink", ""]],
            hostVars: 1,
            hostBindings: function (r, i) {
              1 & r &&
                Ua("click", function (s) {
                  return i.onClick(
                    s.button,
                    s.ctrlKey,
                    s.shiftKey,
                    s.altKey,
                    s.metaKey
                  );
                }),
                2 & r && ja("target", i.target);
            },
            inputs: {
              target: "target",
              queryParams: "queryParams",
              fragment: "fragment",
              queryParamsHandling: "queryParamsHandling",
              state: "state",
              relativeTo: "relativeTo",
              preserveFragment: ["preserveFragment", "preserveFragment", Mf],
              skipLocationChange: [
                "skipLocationChange",
                "skipLocationChange",
                Mf,
              ],
              replaceUrl: ["replaceUrl", "replaceUrl", Mf],
              routerLink: "routerLink",
            },
            standalone: !0,
            features: [f_, cr],
          }));
        }
        return e;
      })();
      class vw {}
      let Qj = (() => {
        class e {
          constructor(n, r, i, o, s) {
            (this.router = n),
              (this.injector = i),
              (this.preloadingStrategy = o),
              (this.loader = s);
          }
          setUpPreloading() {
            this.subscription = this.router.events
              .pipe(
                fn((n) => n instanceof Qn),
                Pi(() => this.preload())
              )
              .subscribe(() => {});
          }
          preload() {
            return this.processRoutes(this.injector, this.router.config);
          }
          ngOnDestroy() {
            this.subscription && this.subscription.unsubscribe();
          }
          processRoutes(n, r) {
            const i = [];
            for (const o of r) {
              o.providers &&
                !o._injector &&
                (o._injector = qd(o.providers, n, `Route: ${o.path}`));
              const s = o._injector ?? n,
                a = o._loadedInjector ?? s;
              ((o.loadChildren && !o._loadedRoutes && void 0 === o.canLoad) ||
                (o.loadComponent && !o._loadedComponent)) &&
                i.push(this.preloadConfig(s, o)),
                (o.children || o._loadedRoutes) &&
                  i.push(this.processRoutes(a, o.children ?? o._loadedRoutes));
            }
            return Re(i).pipe(kr());
          }
          preloadConfig(n, r) {
            return this.preloadingStrategy.preload(r, () => {
              let i;
              i =
                r.loadChildren && void 0 === r.canLoad
                  ? this.loader.loadChildren(n, r)
                  : R(null);
              const o = i.pipe(
                Ne((s) =>
                  null === s
                    ? R(void 0)
                    : ((r._loadedRoutes = s.routes),
                      (r._loadedInjector = s.injector),
                      this.processRoutes(s.injector ?? n, s.routes))
                )
              );
              return r.loadComponent && !r._loadedComponent
                ? Re([o, this.loader.loadComponent(r)]).pipe(kr())
                : o;
            });
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(C(Ft), C(KD), C(Ot), C(vw), C(bh));
          });
          static #t = (this.ɵprov = T({
            token: e,
            factory: e.ɵfac,
            providedIn: "root",
          }));
        }
        return e;
      })();
      const Mh = new E("");
      let Dw = (() => {
        class e {
          constructor(n, r, i, o, s = {}) {
            (this.urlSerializer = n),
              (this.transitions = r),
              (this.viewportScroller = i),
              (this.zone = o),
              (this.options = s),
              (this.lastId = 0),
              (this.lastSource = "imperative"),
              (this.restoredId = 0),
              (this.store = {}),
              (s.scrollPositionRestoration =
                s.scrollPositionRestoration || "disabled"),
              (s.anchorScrolling = s.anchorScrolling || "disabled");
          }
          init() {
            "disabled" !== this.options.scrollPositionRestoration &&
              this.viewportScroller.setHistoryScrollRestoration("manual"),
              (this.routerEventsSubscription = this.createScrollEvents()),
              (this.scrollEventsSubscription = this.consumeScrollEvents());
          }
          createScrollEvents() {
            return this.transitions.events.subscribe((n) => {
              n instanceof xc
                ? ((this.store[this.lastId] =
                    this.viewportScroller.getScrollPosition()),
                  (this.lastSource = n.navigationTrigger),
                  (this.restoredId = n.restoredState
                    ? n.restoredState.navigationId
                    : 0))
                : n instanceof Qn
                ? ((this.lastId = n.id),
                  this.scheduleScrollEvent(
                    n,
                    this.urlSerializer.parse(n.urlAfterRedirects).fragment
                  ))
                : n instanceof Li &&
                  0 === n.code &&
                  ((this.lastSource = void 0),
                  (this.restoredId = 0),
                  this.scheduleScrollEvent(
                    n,
                    this.urlSerializer.parse(n.url).fragment
                  ));
            });
          }
          consumeScrollEvents() {
            return this.transitions.events.subscribe((n) => {
              n instanceof GC &&
                (n.position
                  ? "top" === this.options.scrollPositionRestoration
                    ? this.viewportScroller.scrollToPosition([0, 0])
                    : "enabled" === this.options.scrollPositionRestoration &&
                      this.viewportScroller.scrollToPosition(n.position)
                  : n.anchor && "enabled" === this.options.anchorScrolling
                  ? this.viewportScroller.scrollToAnchor(n.anchor)
                  : "disabled" !== this.options.scrollPositionRestoration &&
                    this.viewportScroller.scrollToPosition([0, 0]));
            });
          }
          scheduleScrollEvent(n, r) {
            this.zone.runOutsideAngular(() => {
              setTimeout(() => {
                this.zone.run(() => {
                  this.transitions.events.next(
                    new GC(
                      n,
                      "popstate" === this.lastSource
                        ? this.store[this.restoredId]
                        : null,
                      r
                    )
                  );
                });
              }, 0);
            });
          }
          ngOnDestroy() {
            this.routerEventsSubscription?.unsubscribe(),
              this.scrollEventsSubscription?.unsubscribe();
          }
          static #e = (this.ɵfac = function (r) {
            !(function By() {
              throw new Error("invalid");
            })();
          });
          static #t = (this.ɵprov = T({ token: e, factory: e.ɵfac }));
        }
        return e;
      })();
      function Nn(e, t) {
        return { ɵkind: e, ɵproviders: t };
      }
      function Cw() {
        const e = M(mt);
        return (t) => {
          const n = e.get(Dr);
          if (t !== n.components[0]) return;
          const r = e.get(Ft),
            i = e.get(ww);
          1 === e.get(Ih) && r.initialNavigation(),
            e.get(bw, null, z.Optional)?.setUpPreloading(),
            e.get(Mh, null, z.Optional)?.init(),
            r.resetRootComponentType(n.componentTypes[0]),
            i.closed || (i.next(), i.complete(), i.unsubscribe());
        };
      }
      const ww = new E("", { factory: () => new bt() }),
        Ih = new E("", { providedIn: "root", factory: () => 1 }),
        bw = new E("");
      function e2(e) {
        return Nn(0, [
          { provide: bw, useExisting: Qj },
          { provide: vw, useExisting: e },
        ]);
      }
      const Mw = new E("ROUTER_FORROOT_GUARD"),
        n2 = [
          Af,
          { provide: ts, useClass: sh },
          Ft,
          as,
          {
            provide: Bi,
            useFactory: function Ew(e) {
              return e.routerState.root;
            },
            deps: [Ft],
          },
          bh,
          [],
        ];
      function r2() {
        return new tE("Router", Ft);
      }
      let Iw = (() => {
        class e {
          constructor(n) {}
          static forRoot(n, r) {
            return {
              ngModule: e,
              providers: [
                n2,
                [],
                { provide: Ui, multi: !0, useValue: n },
                {
                  provide: Mw,
                  useFactory: a2,
                  deps: [[Ft, new dr(), new mo()]],
                },
                { provide: $c, useValue: r || {} },
                r?.useHash
                  ? { provide: Cr, useClass: fF }
                  : { provide: Cr, useClass: NE },
                {
                  provide: Mh,
                  useFactory: () => {
                    const e = M(xk),
                      t = M(te),
                      n = M($c),
                      r = M(Vc),
                      i = M(ts);
                    return (
                      n.scrollOffset && e.setOffset(n.scrollOffset),
                      new Dw(i, r, e, t, n)
                    );
                  },
                },
                r?.preloadingStrategy
                  ? e2(r.preloadingStrategy).ɵproviders
                  : [],
                { provide: tE, multi: !0, useFactory: r2 },
                r?.initialNavigation ? c2(r) : [],
                r?.bindToComponentInputs
                  ? Nn(8, [JC, { provide: kc, useExisting: JC }]).ɵproviders
                  : [],
                [
                  { provide: Sw, useFactory: Cw },
                  { provide: yf, multi: !0, useExisting: Sw },
                ],
              ],
            };
          }
          static forChild(n) {
            return {
              ngModule: e,
              providers: [{ provide: Ui, multi: !0, useValue: n }],
            };
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(C(Mw, 8));
          });
          static #t = (this.ɵmod = dt({ type: e }));
          static #n = (this.ɵinj = tt({}));
        }
        return e;
      })();
      function a2(e) {
        return "guarded";
      }
      function c2(e) {
        return [
          "disabled" === e.initialNavigation
            ? Nn(3, [
                {
                  provide: lf,
                  multi: !0,
                  useFactory: () => {
                    const t = M(Ft);
                    return () => {
                      t.setUpLocationChangeListener();
                    };
                  },
                },
                { provide: Ih, useValue: 2 },
              ]).ɵproviders
            : [],
          "enabledBlocking" === e.initialNavigation
            ? Nn(2, [
                { provide: Ih, useValue: 0 },
                {
                  provide: lf,
                  multi: !0,
                  deps: [mt],
                  useFactory: (t) => {
                    const n = t.get(uF, Promise.resolve());
                    return () =>
                      n.then(
                        () =>
                          new Promise((r) => {
                            const i = t.get(Ft),
                              o = t.get(ww);
                            yw(i, () => {
                              r(!0);
                            }),
                              (t.get(Vc).afterPreactivation = () => (
                                r(!0), o.closed ? R(void 0) : o
                              )),
                              i.initialNavigation();
                          })
                      );
                  },
                },
              ]).ɵproviders
            : [],
        ];
      }
      const Sw = new E("");
      function u2(e, t) {
        1 & e && _t(0, "div", 21);
      }
      function d2(e, t) {
        1 & e && _t(0, "div", 22);
      }
      function f2(e, t) {
        if (
          (1 & e &&
            (oe(0, "div", 15)(1, "div", 16)(2, "div", 17)(3, "p"),
            Ye(4),
            se()(),
            oe(5, "div", 18),
            Lo(6, u2, 1, 0, "div", 19),
            Lo(7, d2, 1, 0, "div", 20),
            se()()()),
          2 & e)
        ) {
          const n = t.$implicit,
            r = F_();
          sn(4),
            Wa(n.titulo),
            sn(2),
            Mi("ngForOf", r.getFilledCircles(n.nivel)),
            sn(1),
            Mi("ngForOf", r.getEmptyCircles(n.nivel));
        }
      }
      function p2(e, t) {
        if (
          (1 & e &&
            (oe(0, "div", 3),
            _t(1, "img", 4),
            oe(2, "div", 5)(3, "h2", 6),
            Ye(4),
            se(),
            oe(5, "p", 7),
            Ye(6),
            se(),
            oe(7, "a", 8),
            Ye(8, "Mais informa\xe7\xf5es"),
            se()()()),
          2 & e)
        ) {
          const n = t.$implicit;
          sn(1),
            za("src", n.imagem, ya),
            sn(3),
            Wa(n.titulo),
            sn(2),
            Ka(" ", n.descricao, " "),
            sn(1),
            za("href", n.github, ya);
        }
      }
      const g2 = [
        {
          path: "",
          component: (() => {
            class e {
              constructor() {
                this.skills = [
                  { titulo: "HTML", nivel: 5 },
                  { titulo: "CSS3", nivel: 5 },
                  { titulo: "SASS", nivel: 5 },
                  { titulo: "Styled-Components", nivel: 3 },
                  { titulo: "Typescript", nivel: 4 },
                  { titulo: "Javascript", nivel: 4 },
                  { titulo: "Angular", nivel: 4 },
                  { titulo: "React.js", nivel: 3 },
                  { titulo: "React Native", nivel: 3 },
                  { titulo: "Java", nivel: 3 },
                  { titulo: "Spring Boot", nivel: 3 },
                  { titulo: "Node.Js", nivel: 4 },
                  { titulo: "Express", nivel: 3 },
                  { titulo: "C#", nivel: 2 },
                  { titulo: ".NET", nivel: 2 },
                  { titulo: "Figma", nivel: 4 },
                  { titulo: "Jest", nivel: 4 },
                  { titulo: "Jasmine", nivel: 4 },
                  { titulo: "Bootstrap", nivel: 5 },
                  { titulo: "Material", nivel: 5 },
                ];
              }
              ngOnInit() {}
              getFilledCircles(n) {
                return Array(n).fill(0);
              }
              getEmptyCircles(n) {
                return Array(5 - n).fill(0);
              }
              static #e = (this.ɵfac = function (r) {
                return new (r || e)();
              });
              static #t = (this.ɵcmp = or({
                type: e,
                selectors: [["app-sobre"]],
                decls: 21,
                vars: 1,
                consts: [
                  [1, "container"],
                  [1, "header"],
                  [1, "header__title"],
                  [1, "header__title__introduction"],
                  [1, "header__title__name"],
                  [1, "header__title__description"],
                  [1, "header__image"],
                  [
                    "src",
                    "./assets/img/projetos/avatar.png",
                    "alt",
                    "",
                    1,
                    "header__image__profile",
                  ],
                  [1, "information"],
                  [1, "about"],
                  [1, "about__title"],
                  [1, "about__text"],
                  [1, "skills"],
                  [1, "title-skills"],
                  ["class", "range", 4, "ngFor", "ngForOf"],
                  [1, "range"],
                  [1, "conteudo"],
                  [1, "title"],
                  [1, "circles"],
                  ["class", "circles__full-circle", 4, "ngFor", "ngForOf"],
                  ["class", "circles__empty-circle", 4, "ngFor", "ngForOf"],
                  [1, "circles__full-circle"],
                  [1, "circles__empty-circle"],
                ],
                template: function (r, i) {
                  1 & r &&
                    (oe(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "p", 3),
                    Ye(4, "Ol\xe1, meu nome \xe9"),
                    se(),
                    oe(5, "p", 4),
                    Ye(6, "Paola Arrue\xe9"),
                    se(),
                    oe(7, "p", 5),
                    Ye(
                      8,
                      " Sou uma desenvolvedora full stack com foco em Front-end na DBServer. "
                    ),
                    se()(),
                    oe(9, "div", 6),
                    _t(10, "img", 7),
                    se()(),
                    oe(11, "div", 8)(12, "div", 9)(13, "p", 10),
                    Ye(14, "Sobre Mim"),
                    se(),
                    oe(15, "p", 11),
                    Ye(
                      16,
                      " Como desenvolvedora, comecei minha jornada como especialista em front-end e, ao longo do tempo, expandi minha atua\xe7\xe3o para abra\xe7ar desafios full-stack. Tenho experi\xeancia pr\xe1tica com diversas tecnologias, incluindo Angular, React, React Native, Spring Boot, Node.js e Express. Atualmente, estou aprimorando minhas habilidades em .NET. Atualmente, desempenho o papel de mentora de alguns trainees, compartilhando meu conhecimento e experi\xeancia para ajud\xe1-los a crescer em suas pr\xf3prias jornadas profissionais. "
                    ),
                    se()(),
                    oe(17, "div", 12)(18, "p", 13),
                    Ye(19, "Habilidades"),
                    se(),
                    Lo(20, f2, 8, 3, "div", 14),
                    se()()()),
                    2 & r && (sn(20), Mi("ngForOf", i.skills));
                },
                dependencies: [Hf],
                styles: [
                  ".container[_ngcontent-%COMP%]{padding:70px 124px}.container[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]{display:flex;justify-content:space-between}.container[_ngcontent-%COMP%]   .header__title[_ngcontent-%COMP%]{width:50%;line-height:5.5ch}.container[_ngcontent-%COMP%]   .header__title__introduction[_ngcontent-%COMP%]{font-size:34px;font-weight:700}.container[_ngcontent-%COMP%]   .header__title__name[_ngcontent-%COMP%]{padding:30px 0;font-size:80px;font-weight:700;text-wrap:nowrap}.container[_ngcontent-%COMP%]   .header__title__description[_ngcontent-%COMP%]{font-size:34px;font-weight:400}.container[_ngcontent-%COMP%]   .header__image[_ngcontent-%COMP%]{width:40%;display:flex;justify-content:flex-end}.container[_ngcontent-%COMP%]   .header__image__profile[_ngcontent-%COMP%]{width:100%;height:auto;max-height:480px;border-radius:4px}.container[_ngcontent-%COMP%]   .information[_ngcontent-%COMP%]{width:100%;margin-top:45px;display:flex;justify-content:space-between}.container[_ngcontent-%COMP%]   .information[_ngcontent-%COMP%]   .about[_ngcontent-%COMP%]{width:50%}.container[_ngcontent-%COMP%]   .information[_ngcontent-%COMP%]   .about__title[_ngcontent-%COMP%]{font-size:38px;line-height:44px;font-weight:600}.container[_ngcontent-%COMP%]   .information[_ngcontent-%COMP%]   .about__text[_ngcontent-%COMP%]{margin-top:40px;font-size:24px;line-height:30px}.container[_ngcontent-%COMP%]   .information[_ngcontent-%COMP%]   .skills[_ngcontent-%COMP%]{width:40%}.container[_ngcontent-%COMP%]   .information[_ngcontent-%COMP%]   .skills[_ngcontent-%COMP%]   .title-skills[_ngcontent-%COMP%]{font-size:38px;line-height:44px;font-weight:600}.container[_ngcontent-%COMP%]   .information[_ngcontent-%COMP%]   .skills[_ngcontent-%COMP%]   .range[_ngcontent-%COMP%]{margin-top:40px;width:100%;display:flex}.container[_ngcontent-%COMP%]   .information[_ngcontent-%COMP%]   .skills[_ngcontent-%COMP%]   .range[_ngcontent-%COMP%]   .conteudo[_ngcontent-%COMP%]{width:100%;display:flex}.container[_ngcontent-%COMP%]   .information[_ngcontent-%COMP%]   .skills[_ngcontent-%COMP%]   .range[_ngcontent-%COMP%]   .conteudo[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{width:50%;font-size:24px}.container[_ngcontent-%COMP%]   .information[_ngcontent-%COMP%]   .skills[_ngcontent-%COMP%]   .range[_ngcontent-%COMP%]   .conteudo[_ngcontent-%COMP%]   .circles[_ngcontent-%COMP%]{width:50%;display:flex;justify-content:center;gap:7px}.container[_ngcontent-%COMP%]   .information[_ngcontent-%COMP%]   .skills[_ngcontent-%COMP%]   .range[_ngcontent-%COMP%]   .conteudo[_ngcontent-%COMP%]   .circles__full-circle[_ngcontent-%COMP%]{width:20px;height:20px;background-color:#eab53d;border:2px solid #eab53d;border-radius:90%}.container[_ngcontent-%COMP%]   .information[_ngcontent-%COMP%]   .skills[_ngcontent-%COMP%]   .range[_ngcontent-%COMP%]   .conteudo[_ngcontent-%COMP%]   .circles__empty-circle[_ngcontent-%COMP%]{width:20px;height:20px;border:2px solid #eab53d;border-radius:90%}@media (max-width: 1163px){.container[_ngcontent-%COMP%]{padding:40px}.container[_ngcontent-%COMP%]   .header__title__introduction[_ngcontent-%COMP%]{font-size:24px}.container[_ngcontent-%COMP%]   .header__title__name[_ngcontent-%COMP%]{font-size:50px}.container[_ngcontent-%COMP%]   .header__title__description[_ngcontent-%COMP%]{font-size:24px}.container[_ngcontent-%COMP%]   .information[_ngcontent-%COMP%]   .about__title[_ngcontent-%COMP%]{font-size:28px}.container[_ngcontent-%COMP%]   .information[_ngcontent-%COMP%]   .about__text[_ngcontent-%COMP%]{margin-top:20px;font-size:18px}.container[_ngcontent-%COMP%]   .information[_ngcontent-%COMP%]   .skills[_ngcontent-%COMP%]   .title-skills[_ngcontent-%COMP%]{font-size:28px}.container[_ngcontent-%COMP%]   .information[_ngcontent-%COMP%]   .skills[_ngcontent-%COMP%]   .range[_ngcontent-%COMP%]{margin-top:20px;width:100%;display:flex}.container[_ngcontent-%COMP%]   .information[_ngcontent-%COMP%]   .skills[_ngcontent-%COMP%]   .range[_ngcontent-%COMP%]   .conteudo[_ngcontent-%COMP%]{width:100%;display:flex}.container[_ngcontent-%COMP%]   .information[_ngcontent-%COMP%]   .skills[_ngcontent-%COMP%]   .range[_ngcontent-%COMP%]   .conteudo[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{width:50%;font-size:18px}.container[_ngcontent-%COMP%]   .information[_ngcontent-%COMP%]   .skills[_ngcontent-%COMP%]   .range[_ngcontent-%COMP%]   .conteudo[_ngcontent-%COMP%]   .circles[_ngcontent-%COMP%]{width:50%;display:flex;justify-content:center;gap:7px}.container[_ngcontent-%COMP%]   .information[_ngcontent-%COMP%]   .skills[_ngcontent-%COMP%]   .range[_ngcontent-%COMP%]   .conteudo[_ngcontent-%COMP%]   .circles__full-circle[_ngcontent-%COMP%], .container[_ngcontent-%COMP%]   .information[_ngcontent-%COMP%]   .skills[_ngcontent-%COMP%]   .range[_ngcontent-%COMP%]   .conteudo[_ngcontent-%COMP%]   .circles__empty-circle[_ngcontent-%COMP%]{width:18px;height:18px}}@media (max-width: 851px){.container[_ngcontent-%COMP%]{padding:40px}.container[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]{flex-direction:column}.container[_ngcontent-%COMP%]   .header__title[_ngcontent-%COMP%]{width:100%}.container[_ngcontent-%COMP%]   .header__image[_ngcontent-%COMP%]{width:100%;display:flex;justify-content:center}.container[_ngcontent-%COMP%]   .header__image__profile[_ngcontent-%COMP%]{width:60%;border-radius:280px}.container[_ngcontent-%COMP%]   .information[_ngcontent-%COMP%]{margin-top:40px;flex-direction:column}.container[_ngcontent-%COMP%]   .information[_ngcontent-%COMP%]   .about[_ngcontent-%COMP%]{width:100%}.container[_ngcontent-%COMP%]   .information[_ngcontent-%COMP%]   .skills[_ngcontent-%COMP%]{margin-top:30px;width:100%}}@media (max-width: 370px){.container[_ngcontent-%COMP%]   .header__title__introduction[_ngcontent-%COMP%]{font-size:20px}.container[_ngcontent-%COMP%]   .header__title__name[_ngcontent-%COMP%]{font-size:40px}.container[_ngcontent-%COMP%]   .header__title__description[_ngcontent-%COMP%]{font-size:20px}.container[_ngcontent-%COMP%]   .header__image__profile[_ngcontent-%COMP%]{width:100%}.container[_ngcontent-%COMP%]   .information[_ngcontent-%COMP%]   .about__title[_ngcontent-%COMP%]{font-size:20px}.container[_ngcontent-%COMP%]   .information[_ngcontent-%COMP%]   .about__text[_ngcontent-%COMP%]{font-size:14px}.container[_ngcontent-%COMP%]   .information[_ngcontent-%COMP%]   .skills[_ngcontent-%COMP%]   .title-skills[_ngcontent-%COMP%]{font-size:20px}.container[_ngcontent-%COMP%]   .information[_ngcontent-%COMP%]   .skills[_ngcontent-%COMP%]   .range[_ngcontent-%COMP%]   .conteudo[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{font-size:14px}.container[_ngcontent-%COMP%]   .information[_ngcontent-%COMP%]   .skills[_ngcontent-%COMP%]   .range[_ngcontent-%COMP%]   .conteudo[_ngcontent-%COMP%]   .circles__full-circle[_ngcontent-%COMP%], .container[_ngcontent-%COMP%]   .information[_ngcontent-%COMP%]   .skills[_ngcontent-%COMP%]   .range[_ngcontent-%COMP%]   .conteudo[_ngcontent-%COMP%]   .circles__empty-circle[_ngcontent-%COMP%]{width:12px;height:12px}}",
                ],
              }));
            }
            return e;
          })(),
        },
        {
          path: "projetos",
          component: (() => {
            class e {
              constructor() {
                this.projetos = [
                  {
                    titulo: "Dragop\xe9dia",
                    descricao:
                      "Projeto front-end responsivo desenvolvido com React, Styled Components e Vite.",
                    github: "https://github.com/paolaarruee/Dragopedia",
                    imagem: "./assets/img/projetos/dragopedia.png",
                  },
                  {
                    titulo: "Gerenciamento de Vota\xe7\xe3o Front",
                    descricao:
                      "Aplica\xe7\xe3o Angular com testes unit\xe1rios em Karma e Jasmine.",
                    github: "https://github.com/paolaarruee/votacao-front",
                    imagem:
                      "./assets/img/projetos/gerenciador-votacao-front.png",
                  },
                  {
                    titulo: "Gerenciamento de Vota\xe7\xe3o Back",
                    descricao:
                      "Back-end Node.js com MySQL e SQLite para testes, utilizando Knex, Yup e Jest.",
                    github: "https://github.com/paolaarruee/desafio-back-DB",
                    imagem: "./assets/img/projetos/votacao.png",
                  },
                  {
                    titulo: "Aprendendo Ingl\xeas",
                    descricao:
                      "Sistema Angular para aprendizagem de ingl\xeas, utilizando Bootstrap.",
                    github: "https://github.com/paolaarruee/desafio-back-DB",
                    imagem: "./assets/img/projetos/aprendendoingles.png",
                  },
                  {
                    titulo: "Naruto Java",
                    descricao:
                      "Sistema Java para cadastro de personagens e simula\xe7\xe3o de batalhas.",
                    github: "https://github.com/paolaarruee/naruto-java",
                    imagem: "./assets/img/projetos/naruto-java.png",
                  },
                  {
                    titulo: "Portfolio Pessoal",
                    descricao:
                      "Meu portf\xf3lio pessoal desenvolvido com CSS, HTML e JavaScript.",
                    link: "https://paola-arruee.netlify.app/",
                    github: "https://github.com/paolaarruee/portfolio",
                    imagem:
                      "./assets/img/projetos/portfolio-pessoal.png",
                  },
                  {
                    titulo: "Portfolio DB",
                    descricao:
                      "Meu portf\xf3lio pessoal com layout concebido pela DB, utilizando Angular Material e SCSS.",
                    github: "https://github.com/paolaarruee/portfolio",
                    imagem: "./assets/img/projetos/portfolio-db.png",
                  },
                ];
              }
              static #e = (this.ɵfac = function (r) {
                return new (r || e)();
              });
              static #t = (this.ɵcmp = or({
                type: e,
                selectors: [["app-projetos"]],
                decls: 4,
                vars: 1,
                consts: [
                  [1, "title"],
                  [1, "container"],
                  ["class", "card", 4, "ngFor", "ngForOf"],
                  [1, "card"],
                  ["alt", "imagem do projeto", 1, "card__image", 3, "src"],
                  [1, "card__content"],
                  [1, "card__content__title"],
                  [1, "card__content__description"],
                  [1, "card__content__github", 3, "href"],
                ],
                template: function (r, i) {
                  1 & r &&
                    (oe(0, "h1", 0),
                    Ye(1, "Projetos"),
                    se(),
                    oe(2, "div", 1),
                    Lo(3, p2, 9, 4, "div", 2),
                    se()),
                    2 & r && (sn(3), Mi("ngForOf", i.projetos));
                },
                dependencies: [Hf],
                styles: [
                  ".title[_ngcontent-%COMP%]{padding-top:50px;display:flex;justify-content:center;font-family:Montserrat;color:#201f53;font-size:30px}.container[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;padding:50px;font-family:Montserrat}.container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]{width:30rem;height:20rem;border-radius:10px;margin:10px 40px;overflow:hidden;position:relative;color:#000;box-shadow:0 10px 30px 5px #0003}.container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{position:absolute;object-fit:inherit;width:100%;height:100%;top:0;left:0;opacity:.9;transition:opacity .2s ease-out}.container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]:hover   img[_ngcontent-%COMP%]{transition:opacity .3s ease-in;opacity:.4}.container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{position:absolute;inset:auto auto 30px 30px;margin:0;transition:inset .3s .3s ease-out;font-weight:400;text-transform:uppercase;font-family:Montserrat;color:#201f53}.container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], .container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{position:absolute;opacity:0;max-width:80%;transition:opacity .3s ease-out}.container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{inset:auto auto 80px 30px}.container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{inset:auto auto 40px 30px;color:inherit;text-decoration:none;color:#ed0973}.container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]:hover   h2[_ngcontent-%COMP%]{inset:auto auto 220px 30px;transition:inset .3s ease-out}.container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]:hover   p[_ngcontent-%COMP%], .container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]:hover   a[_ngcontent-%COMP%]{opacity:1;transition:opacity .5s .1s ease-in}@media (max-width: 700px){.container[_ngcontent-%COMP%]{padding:0}.container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]{width:80%;height:300px}.container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-size:15px}.container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], .container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{font-size:14px}}@media (max-width: 435px){.container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]{height:200px}}",
                ],
              }));
            }
            return e;
          })(),
        },
      ];
      let Sh,
        Tw = (() => {
          class e {
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵmod = dt({ type: e }));
            static #n = (this.ɵinj = tt({ imports: [Iw.forRoot(g2), Iw] }));
          }
          return e;
        })();
      try {
        Sh = typeof Intl < "u" && Intl.v8BreakIterator;
      } catch {
        Sh = !1;
      }
      let ps,
        Aw = (() => {
          class e {
            constructor(n) {
              (this._platformId = n),
                (this.isBrowser = this._platformId
                  ? (function Rk(e) {
                      return e === WE;
                    })(this._platformId)
                  : "object" == typeof document && !!document),
                (this.EDGE =
                  this.isBrowser && /(edge)/i.test(navigator.userAgent)),
                (this.TRIDENT =
                  this.isBrowser &&
                  /(msie|trident)/i.test(navigator.userAgent)),
                (this.BLINK =
                  this.isBrowser &&
                  !(!window.chrome && !Sh) &&
                  typeof CSS < "u" &&
                  !this.EDGE &&
                  !this.TRIDENT),
                (this.WEBKIT =
                  this.isBrowser &&
                  /AppleWebKit/i.test(navigator.userAgent) &&
                  !this.BLINK &&
                  !this.EDGE &&
                  !this.TRIDENT),
                (this.IOS =
                  this.isBrowser &&
                  /iPad|iPhone|iPod/.test(navigator.userAgent) &&
                  !("MSStream" in window)),
                (this.FIREFOX =
                  this.isBrowser &&
                  /(firefox|minefield)/i.test(navigator.userAgent)),
                (this.ANDROID =
                  this.isBrowser &&
                  /android/i.test(navigator.userAgent) &&
                  !this.TRIDENT),
                (this.SAFARI =
                  this.isBrowser &&
                  /safari/i.test(navigator.userAgent) &&
                  this.WEBKIT);
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(C(gr));
            });
            static #t = (this.ɵprov = T({
              token: e,
              factory: e.ɵfac,
              providedIn: "root",
            }));
          }
          return e;
        })();
      function zc(e) {
        return (function m2() {
          if (null == ps && typeof window < "u")
            try {
              window.addEventListener(
                "test",
                null,
                Object.defineProperty({}, "passive", { get: () => (ps = !0) })
              );
            } finally {
              ps = ps || !1;
            }
          return ps;
        })()
          ? e
          : !!e.capture;
      }
      function Nw(e) {
        return Array.isArray(e) ? e : [e];
      }
      class T2 extends Ue {
        constructor(t, n) {
          super();
        }
        schedule(t, n = 0) {
          return this;
        }
      }
      const Gc = {
          setInterval(e, t, ...n) {
            const { delegate: r } = Gc;
            return r?.setInterval
              ? r.setInterval(e, t, ...n)
              : setInterval(e, t, ...n);
          },
          clearInterval(e) {
            const { delegate: t } = Gc;
            return (t?.clearInterval || clearInterval)(e);
          },
          delegate: void 0,
        },
        xw = { now: () => (xw.delegate || Date).now(), delegate: void 0 };
      class gs {
        constructor(t, n = gs.now) {
          (this.schedulerActionCtor = t), (this.now = n);
        }
        schedule(t, n = 0, r) {
          return new this.schedulerActionCtor(this, t).schedule(r, n);
        }
      }
      gs.now = xw.now;
      const N2 = new (class O2 extends gs {
          constructor(t, n = gs.now) {
            super(t, n), (this.actions = []), (this._active = !1);
          }
          flush(t) {
            const { actions: n } = this;
            if (this._active) return void n.push(t);
            let r;
            this._active = !0;
            do {
              if ((r = t.execute(t.state, t.delay))) break;
            } while ((t = n.shift()));
            if (((this._active = !1), r)) {
              for (; (t = n.shift()); ) t.unsubscribe();
              throw r;
            }
          }
        })(
          class A2 extends T2 {
            constructor(t, n) {
              super(t, n),
                (this.scheduler = t),
                (this.work = n),
                (this.pending = !1);
            }
            schedule(t, n = 0) {
              var r;
              if (this.closed) return this;
              this.state = t;
              const i = this.id,
                o = this.scheduler;
              return (
                null != i && (this.id = this.recycleAsyncId(o, i, n)),
                (this.pending = !0),
                (this.delay = n),
                (this.id =
                  null !== (r = this.id) && void 0 !== r
                    ? r
                    : this.requestAsyncId(o, this.id, n)),
                this
              );
            }
            requestAsyncId(t, n, r = 0) {
              return Gc.setInterval(t.flush.bind(t, this), r);
            }
            recycleAsyncId(t, n, r = 0) {
              if (null != r && this.delay === r && !1 === this.pending)
                return n;
              null != n && Gc.clearInterval(n);
            }
            execute(t, n) {
              if (this.closed) return new Error("executing a cancelled action");
              this.pending = !1;
              const r = this._execute(t, n);
              if (r) return r;
              !1 === this.pending &&
                null != this.id &&
                (this.id = this.recycleAsyncId(this.scheduler, this.id, null));
            }
            _execute(t, n) {
              let i,
                r = !1;
              try {
                this.work(t);
              } catch (o) {
                (r = !0),
                  (i = o || new Error("Scheduled action threw falsy error"));
              }
              if (r) return this.unsubscribe(), i;
            }
            unsubscribe() {
              if (!this.closed) {
                const { id: t, scheduler: n } = this,
                  { actions: r } = n;
                (this.work = this.state = this.scheduler = null),
                  (this.pending = !1),
                  Fr(r, this),
                  null != t && (this.id = this.recycleAsyncId(n, t, null)),
                  (this.delay = null),
                  super.unsubscribe();
              }
            }
          }
        ),
        Pw = new Set();
      let Sr,
        x2 = (() => {
          class e {
            constructor(n, r) {
              (this._platform = n),
                (this._nonce = r),
                (this._matchMedia =
                  this._platform.isBrowser && window.matchMedia
                    ? window.matchMedia.bind(window)
                    : F2);
            }
            matchMedia(n) {
              return (
                (this._platform.WEBKIT || this._platform.BLINK) &&
                  (function P2(e, t) {
                    if (!Pw.has(e))
                      try {
                        Sr ||
                          ((Sr = document.createElement("style")),
                          t && (Sr.nonce = t),
                          Sr.setAttribute("type", "text/css"),
                          document.head.appendChild(Sr)),
                          Sr.sheet &&
                            (Sr.sheet.insertRule(`@media ${e} {body{ }}`, 0),
                            Pw.add(e));
                      } catch (n) {
                        console.error(n);
                      }
                  })(n, this._nonce),
                this._matchMedia(n)
              );
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(C(Aw), C(qu, 8));
            });
            static #t = (this.ɵprov = T({
              token: e,
              factory: e.ɵfac,
              providedIn: "root",
            }));
          }
          return e;
        })();
      function F2(e) {
        return {
          matches: "all" === e || "" === e,
          media: e,
          addListener: () => {},
          removeListener: () => {},
        };
      }
      let k2 = (() => {
        class e {
          constructor(n, r) {
            (this._mediaMatcher = n),
              (this._zone = r),
              (this._queries = new Map()),
              (this._destroySubject = new bt());
          }
          ngOnDestroy() {
            this._destroySubject.next(), this._destroySubject.complete();
          }
          isMatched(n) {
            return Fw(Nw(n)).some((i) => this._registerQuery(i).mql.matches);
          }
          observe(n) {
            let o = Cc(Fw(Nw(n)).map((s) => this._registerQuery(s).observable));
            return (
              (o = bc(
                o.pipe(Wn(1)),
                o.pipe(
                  (function S2(e) {
                    return fn((t, n) => e <= n);
                  })(1),
                  (function R2(e, t = N2) {
                    return be((n, r) => {
                      let i = null,
                        o = null,
                        s = null;
                      const a = () => {
                        if (i) {
                          i.unsubscribe(), (i = null);
                          const l = o;
                          (o = null), r.next(l);
                        }
                      };
                      function c() {
                        const l = s + e,
                          u = t.now();
                        if (u < l)
                          return (
                            (i = this.schedule(void 0, l - u)), void r.add(i)
                          );
                        a();
                      }
                      n.subscribe(
                        De(
                          r,
                          (l) => {
                            (o = l),
                              (s = t.now()),
                              i || ((i = t.schedule(c, e)), r.add(i));
                          },
                          () => {
                            a(), r.complete();
                          },
                          void 0,
                          () => {
                            o = i = null;
                          }
                        )
                      );
                    });
                  })(0)
                )
              )),
              o.pipe(
                U((s) => {
                  const a = { matches: !1, breakpoints: {} };
                  return (
                    s.forEach(({ matches: c, query: l }) => {
                      (a.matches = a.matches || c), (a.breakpoints[l] = c);
                    }),
                    a
                  );
                })
              )
            );
          }
          _registerQuery(n) {
            if (this._queries.has(n)) return this._queries.get(n);
            const r = this._mediaMatcher.matchMedia(n),
              o = {
                observable: new ve((s) => {
                  const a = (c) => this._zone.run(() => s.next(c));
                  return (
                    r.addListener(a),
                    () => {
                      r.removeListener(a);
                    }
                  );
                }).pipe(
                  wC(r),
                  U(({ matches: s }) => ({ query: n, matches: s })),
                  MC(this._destroySubject)
                ),
                mql: r,
              };
            return this._queries.set(n, o), o;
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(C(x2), C(te));
          });
          static #t = (this.ɵprov = T({
            token: e,
            factory: e.ɵfac,
            providedIn: "root",
          }));
        }
        return e;
      })();
      function Fw(e) {
        return e
          .map((t) => t.split(","))
          .reduce((t, n) => t.concat(n))
          .map((t) => t.trim());
      }
      const Bw = "cdk-high-contrast-black-on-white",
        Hw = "cdk-high-contrast-white-on-black",
        Ah = "cdk-high-contrast-active";
      let W2 = (() => {
          class e {
            constructor(n, r) {
              (this._platform = n),
                (this._document = r),
                (this._breakpointSubscription = M(k2)
                  .observe("(forced-colors: active)")
                  .subscribe(() => {
                    this._hasCheckedHighContrastMode &&
                      ((this._hasCheckedHighContrastMode = !1),
                      this._applyBodyHighContrastModeCssClasses());
                  }));
            }
            getHighContrastMode() {
              if (!this._platform.isBrowser) return 0;
              const n = this._document.createElement("div");
              (n.style.backgroundColor = "rgb(1,2,3)"),
                (n.style.position = "absolute"),
                this._document.body.appendChild(n);
              const r = this._document.defaultView || window,
                i = r && r.getComputedStyle ? r.getComputedStyle(n) : null,
                o = ((i && i.backgroundColor) || "").replace(/ /g, "");
              switch ((n.remove(), o)) {
                case "rgb(0,0,0)":
                case "rgb(45,50,54)":
                case "rgb(32,32,32)":
                  return 2;
                case "rgb(255,255,255)":
                case "rgb(255,250,239)":
                  return 1;
              }
              return 0;
            }
            ngOnDestroy() {
              this._breakpointSubscription.unsubscribe();
            }
            _applyBodyHighContrastModeCssClasses() {
              if (
                !this._hasCheckedHighContrastMode &&
                this._platform.isBrowser &&
                this._document.body
              ) {
                const n = this._document.body.classList;
                n.remove(Ah, Bw, Hw), (this._hasCheckedHighContrastMode = !0);
                const r = this.getHighContrastMode();
                1 === r ? n.add(Ah, Bw) : 2 === r && n.add(Ah, Hw);
              }
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(C(Aw), C(ye));
            });
            static #t = (this.ɵprov = T({
              token: e,
              factory: e.ɵfac,
              providedIn: "root",
            }));
          }
          return e;
        })(),
        Vw = (() => {
          class e {
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵmod = dt({ type: e }));
            static #n = (this.ɵinj = tt({}));
          }
          return e;
        })();
      const Y2 = new E("mat-sanity-checks", {
        providedIn: "root",
        factory: function Q2() {
          return !0;
        },
      });
      let zw = (() => {
        class e {
          constructor(n, r, i) {
            (this._sanityChecks = r),
              (this._document = i),
              (this._hasDoneGlobalChecks = !1),
              n._applyBodyHighContrastModeCssClasses(),
              this._hasDoneGlobalChecks || (this._hasDoneGlobalChecks = !0);
          }
          _checkIsEnabled(n) {
            return (
              !(function v2() {
                return (
                  (typeof __karma__ < "u" && !!__karma__) ||
                  (typeof jasmine < "u" && !!jasmine) ||
                  (typeof jest < "u" && !!jest) ||
                  (typeof Mocha < "u" && !!Mocha)
                );
              })() &&
              ("boolean" == typeof this._sanityChecks
                ? this._sanityChecks
                : !!this._sanityChecks[n])
            );
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(C(W2), C(Y2, 8), C(ye));
          });
          static #t = (this.ɵmod = dt({ type: e }));
          static #n = (this.ɵinj = tt({ imports: [Vw, Vw] }));
        }
        return e;
      })();
      function X2(e, t) {
        return class extends e {
          get color() {
            return this._color;
          }
          set color(n) {
            const r = n || this.defaultColor;
            r !== this._color &&
              (this._color &&
                this._elementRef.nativeElement.classList.remove(
                  `mat-${this._color}`
                ),
              r && this._elementRef.nativeElement.classList.add(`mat-${r}`),
              (this._color = r));
          }
          constructor(...n) {
            super(...n), (this.defaultColor = t), (this.color = t);
          }
        };
      }
      const qw = zc({ passive: !0, capture: !0 });
      class tB {
        constructor() {
          (this._events = new Map()),
            (this._delegateEventHandler = (t) => {
              const n = (function _2(e) {
                return e.composedPath ? e.composedPath()[0] : e.target;
              })(t);
              n &&
                this._events.get(t.type)?.forEach((r, i) => {
                  (i === n || i.contains(n)) &&
                    r.forEach((o) => o.handleEvent(t));
                });
            });
        }
        addHandler(t, n, r, i) {
          const o = this._events.get(n);
          if (o) {
            const s = o.get(r);
            s ? s.add(i) : o.set(r, new Set([i]));
          } else
            this._events.set(n, new Map([[r, new Set([i])]])),
              t.runOutsideAngular(() => {
                document.addEventListener(n, this._delegateEventHandler, qw);
              });
        }
        removeHandler(t, n, r) {
          const i = this._events.get(t);
          if (!i) return;
          const o = i.get(n);
          o &&
            (o.delete(r),
            0 === o.size && i.delete(n),
            0 === i.size &&
              (this._events.delete(t),
              document.removeEventListener(t, this._delegateEventHandler, qw)));
        }
      }
      class Oh {
        static #e = (this._eventManager = new tB());
        constructor(t, n, r, i) {
          (this._target = t),
            (this._ngZone = n),
            (this._platform = i),
            (this._isPointerDown = !1),
            (this._activeRipples = new Map()),
            (this._pointerUpEventsRegistered = !1),
            i.isBrowser && (this._containerElement = Rw(r));
        }
        fadeInRipple(t, n, r = {}) {
          const i = (this._containerRect =
              this._containerRect ||
              this._containerElement.getBoundingClientRect()),
            o = { ...Gw, ...r.animation },
            s =
              r.radius ||
              (function rB(e, t, n) {
                const r = Math.max(Math.abs(e - n.left), Math.abs(e - n.right)),
                  i = Math.max(Math.abs(t - n.top), Math.abs(t - n.bottom));
                return Math.sqrt(r * r + i * i);
              })(t, n, i),
            a = t - i.left,
            c = n - i.top,
            l = o.enterDuration,
            u = document.createElement("div");
          u.classList.add("mat-ripple-element"),
            (u.style.left = a - s + "px"),
            (u.style.top = c - s + "px"),
            (u.style.height = 2 * s + "px"),
            (u.style.width = 2 * s + "px"),
            null != r.color && (u.style.backgroundColor = r.color),
            (u.style.transitionDuration = `${l}ms`),
            this._containerElement.appendChild(u);
          const d = window.getComputedStyle(u),
            h = d.transitionDuration,
            p =
              "none" === d.transitionProperty ||
              "0s" === h ||
              "0s, 0s" === h ||
              (0 === i.width && 0 === i.height),
            g = new eB(this, u, r, p);
          (u.style.transform = "scale3d(1, 1, 1)"),
            (g.state = 0),
            r.persistent || (this._mostRecentTransientRipple = g);
          return (
            !p &&
              (l || o.exitDuration) &&
              this._ngZone.runOutsideAngular(() => {
                const v = () => this._finishRippleTransition(g),
                  m = () => this._destroyRipple(g);
                u.addEventListener("transitionend", v),
                  u.addEventListener("transitioncancel", m);
              }),
            this._activeRipples.set(g, null),
            (p || !l) && this._finishRippleTransition(g),
            g
          );
        }
        fadeOutRipple(t) {
          if (2 === t.state || 3 === t.state) return;
          const n = t.element,
            r = { ...Gw, ...t.config.animation };
          (n.style.transitionDuration = `${r.exitDuration}ms`),
            (n.style.opacity = "0"),
            (t.state = 2),
            (t._animationForciblyDisabledThroughCss || !r.exitDuration) &&
              this._finishRippleTransition(t);
        }
        fadeOutAll() {
          this._getActiveRipples().forEach((t) => t.fadeOut());
        }
        fadeOutAllNonPersistent() {
          this._getActiveRipples().forEach((t) => {
            t.config.persistent || t.fadeOut();
          });
        }
        setupTriggerEvents(t) {
          const n = Rw(t);
          !this._platform.isBrowser ||
            !n ||
            n === this._triggerElement ||
            (this._removeTriggerEvents(),
            (this._triggerElement = n),
            Kw.forEach((r) => {
              Oh._eventManager.addHandler(this._ngZone, r, n, this);
            }));
        }
        handleEvent(t) {
          "mousedown" === t.type
            ? this._onMousedown(t)
            : "touchstart" === t.type
            ? this._onTouchStart(t)
            : this._onPointerUp(),
            this._pointerUpEventsRegistered ||
              (this._ngZone.runOutsideAngular(() => {
                Zw.forEach((n) => {
                  this._triggerElement.addEventListener(n, this, Ww);
                });
              }),
              (this._pointerUpEventsRegistered = !0));
        }
        _finishRippleTransition(t) {
          0 === t.state
            ? this._startFadeOutTransition(t)
            : 2 === t.state && this._destroyRipple(t);
        }
        _startFadeOutTransition(t) {
          const n = t === this._mostRecentTransientRipple,
            { persistent: r } = t.config;
          (t.state = 1), !r && (!n || !this._isPointerDown) && t.fadeOut();
        }
        _destroyRipple(t) {
          const n = this._activeRipples.get(t) ?? null;
          this._activeRipples.delete(t),
            this._activeRipples.size || (this._containerRect = null),
            t === this._mostRecentTransientRipple &&
              (this._mostRecentTransientRipple = null),
            (t.state = 3),
            null !== n &&
              (t.element.removeEventListener(
                "transitionend",
                n.onTransitionEnd
              ),
              t.element.removeEventListener(
                "transitioncancel",
                n.onTransitionCancel
              )),
            t.element.remove();
        }
        _onMousedown(t) {
          const n = (function z2(e) {
              return 0 === e.buttons || 0 === e.detail;
            })(t),
            r =
              this._lastTouchStartEvent &&
              Date.now() < this._lastTouchStartEvent + 800;
          !this._target.rippleDisabled &&
            !n &&
            !r &&
            ((this._isPointerDown = !0),
            this.fadeInRipple(t.clientX, t.clientY, this._target.rippleConfig));
        }
        _onTouchStart(t) {
          if (
            !this._target.rippleDisabled &&
            !(function q2(e) {
              const t =
                (e.touches && e.touches[0]) ||
                (e.changedTouches && e.changedTouches[0]);
              return !(
                !t ||
                -1 !== t.identifier ||
                (null != t.radiusX && 1 !== t.radiusX) ||
                (null != t.radiusY && 1 !== t.radiusY)
              );
            })(t)
          ) {
            (this._lastTouchStartEvent = Date.now()),
              (this._isPointerDown = !0);
            const n = t.changedTouches;
            if (n)
              for (let r = 0; r < n.length; r++)
                this.fadeInRipple(
                  n[r].clientX,
                  n[r].clientY,
                  this._target.rippleConfig
                );
          }
        }
        _onPointerUp() {
          this._isPointerDown &&
            ((this._isPointerDown = !1),
            this._getActiveRipples().forEach((t) => {
              !t.config.persistent &&
                (1 === t.state ||
                  (t.config.terminateOnPointerUp && 0 === t.state)) &&
                t.fadeOut();
            }));
        }
        _getActiveRipples() {
          return Array.from(this._activeRipples.keys());
        }
        _removeTriggerEvents() {
          const t = this._triggerElement;
          t &&
            (Kw.forEach((n) => Oh._eventManager.removeHandler(n, t, this)),
            this._pointerUpEventsRegistered &&
              Zw.forEach((n) => t.removeEventListener(n, this, Ww)));
        }
      }
      class Nh {}
      class Rn {
        constructor(t) {
          (this.normalizedNames = new Map()),
            (this.lazyUpdate = null),
            t
              ? "string" == typeof t
                ? (this.lazyInit = () => {
                    (this.headers = new Map()),
                      t.split("\n").forEach((n) => {
                        const r = n.indexOf(":");
                        if (r > 0) {
                          const i = n.slice(0, r),
                            o = i.toLowerCase(),
                            s = n.slice(r + 1).trim();
                          this.maybeSetNormalizedName(i, o),
                            this.headers.has(o)
                              ? this.headers.get(o).push(s)
                              : this.headers.set(o, [s]);
                        }
                      });
                  })
                : typeof Headers < "u" && t instanceof Headers
                ? ((this.headers = new Map()),
                  t.forEach((n, r) => {
                    this.setHeaderEntries(r, n);
                  }))
                : (this.lazyInit = () => {
                    (this.headers = new Map()),
                      Object.entries(t).forEach(([n, r]) => {
                        this.setHeaderEntries(n, r);
                      });
                  })
              : (this.headers = new Map());
        }
        has(t) {
          return this.init(), this.headers.has(t.toLowerCase());
        }
        get(t) {
          this.init();
          const n = this.headers.get(t.toLowerCase());
          return n && n.length > 0 ? n[0] : null;
        }
        keys() {
          return this.init(), Array.from(this.normalizedNames.values());
        }
        getAll(t) {
          return this.init(), this.headers.get(t.toLowerCase()) || null;
        }
        append(t, n) {
          return this.clone({ name: t, value: n, op: "a" });
        }
        set(t, n) {
          return this.clone({ name: t, value: n, op: "s" });
        }
        delete(t, n) {
          return this.clone({ name: t, value: n, op: "d" });
        }
        maybeSetNormalizedName(t, n) {
          this.normalizedNames.has(n) || this.normalizedNames.set(n, t);
        }
        init() {
          this.lazyInit &&
            (this.lazyInit instanceof Rn
              ? this.copyFrom(this.lazyInit)
              : this.lazyInit(),
            (this.lazyInit = null),
            this.lazyUpdate &&
              (this.lazyUpdate.forEach((t) => this.applyUpdate(t)),
              (this.lazyUpdate = null)));
        }
        copyFrom(t) {
          t.init(),
            Array.from(t.headers.keys()).forEach((n) => {
              this.headers.set(n, t.headers.get(n)),
                this.normalizedNames.set(n, t.normalizedNames.get(n));
            });
        }
        clone(t) {
          const n = new Rn();
          return (
            (n.lazyInit =
              this.lazyInit && this.lazyInit instanceof Rn
                ? this.lazyInit
                : this),
            (n.lazyUpdate = (this.lazyUpdate || []).concat([t])),
            n
          );
        }
        applyUpdate(t) {
          const n = t.name.toLowerCase();
          switch (t.op) {
            case "a":
            case "s":
              let r = t.value;
              if (("string" == typeof r && (r = [r]), 0 === r.length)) return;
              this.maybeSetNormalizedName(t.name, n);
              const i = ("a" === t.op ? this.headers.get(n) : void 0) || [];
              i.push(...r), this.headers.set(n, i);
              break;
            case "d":
              const o = t.value;
              if (o) {
                let s = this.headers.get(n);
                if (!s) return;
                (s = s.filter((a) => -1 === o.indexOf(a))),
                  0 === s.length
                    ? (this.headers.delete(n), this.normalizedNames.delete(n))
                    : this.headers.set(n, s);
              } else this.headers.delete(n), this.normalizedNames.delete(n);
          }
        }
        setHeaderEntries(t, n) {
          const r = (Array.isArray(n) ? n : [n]).map((o) => o.toString()),
            i = t.toLowerCase();
          this.headers.set(i, r), this.maybeSetNormalizedName(t, i);
        }
        forEach(t) {
          this.init(),
            Array.from(this.normalizedNames.keys()).forEach((n) =>
              t(this.normalizedNames.get(n), this.headers.get(n))
            );
        }
      }
      class oB {
        encodeKey(t) {
          return Qw(t);
        }
        encodeValue(t) {
          return Qw(t);
        }
        decodeKey(t) {
          return decodeURIComponent(t);
        }
        decodeValue(t) {
          return decodeURIComponent(t);
        }
      }
      const aB = /%(\d[a-f0-9])/gi,
        cB = {
          40: "@",
          "3A": ":",
          24: "$",
          "2C": ",",
          "3B": ";",
          "3D": "=",
          "3F": "?",
          "2F": "/",
        };
      function Qw(e) {
        return encodeURIComponent(e).replace(aB, (t, n) => cB[n] ?? t);
      }
      function Wc(e) {
        return `${e}`;
      }
      class Yn {
        constructor(t = {}) {
          if (
            ((this.updates = null),
            (this.cloneFrom = null),
            (this.encoder = t.encoder || new oB()),
            t.fromString)
          ) {
            if (t.fromObject)
              throw new Error("Cannot specify both fromString and fromObject.");
            this.map = (function sB(e, t) {
              const n = new Map();
              return (
                e.length > 0 &&
                  e
                    .replace(/^\?/, "")
                    .split("&")
                    .forEach((i) => {
                      const o = i.indexOf("="),
                        [s, a] =
                          -1 == o
                            ? [t.decodeKey(i), ""]
                            : [
                                t.decodeKey(i.slice(0, o)),
                                t.decodeValue(i.slice(o + 1)),
                              ],
                        c = n.get(s) || [];
                      c.push(a), n.set(s, c);
                    }),
                n
              );
            })(t.fromString, this.encoder);
          } else
            t.fromObject
              ? ((this.map = new Map()),
                Object.keys(t.fromObject).forEach((n) => {
                  const r = t.fromObject[n],
                    i = Array.isArray(r) ? r.map(Wc) : [Wc(r)];
                  this.map.set(n, i);
                }))
              : (this.map = null);
        }
        has(t) {
          return this.init(), this.map.has(t);
        }
        get(t) {
          this.init();
          const n = this.map.get(t);
          return n ? n[0] : null;
        }
        getAll(t) {
          return this.init(), this.map.get(t) || null;
        }
        keys() {
          return this.init(), Array.from(this.map.keys());
        }
        append(t, n) {
          return this.clone({ param: t, value: n, op: "a" });
        }
        appendAll(t) {
          const n = [];
          return (
            Object.keys(t).forEach((r) => {
              const i = t[r];
              Array.isArray(i)
                ? i.forEach((o) => {
                    n.push({ param: r, value: o, op: "a" });
                  })
                : n.push({ param: r, value: i, op: "a" });
            }),
            this.clone(n)
          );
        }
        set(t, n) {
          return this.clone({ param: t, value: n, op: "s" });
        }
        delete(t, n) {
          return this.clone({ param: t, value: n, op: "d" });
        }
        toString() {
          return (
            this.init(),
            this.keys()
              .map((t) => {
                const n = this.encoder.encodeKey(t);
                return this.map
                  .get(t)
                  .map((r) => n + "=" + this.encoder.encodeValue(r))
                  .join("&");
              })
              .filter((t) => "" !== t)
              .join("&")
          );
        }
        clone(t) {
          const n = new Yn({ encoder: this.encoder });
          return (
            (n.cloneFrom = this.cloneFrom || this),
            (n.updates = (this.updates || []).concat(t)),
            n
          );
        }
        init() {
          null === this.map && (this.map = new Map()),
            null !== this.cloneFrom &&
              (this.cloneFrom.init(),
              this.cloneFrom
                .keys()
                .forEach((t) => this.map.set(t, this.cloneFrom.map.get(t))),
              this.updates.forEach((t) => {
                switch (t.op) {
                  case "a":
                  case "s":
                    const n =
                      ("a" === t.op ? this.map.get(t.param) : void 0) || [];
                    n.push(Wc(t.value)), this.map.set(t.param, n);
                    break;
                  case "d":
                    if (void 0 === t.value) {
                      this.map.delete(t.param);
                      break;
                    }
                    {
                      let r = this.map.get(t.param) || [];
                      const i = r.indexOf(Wc(t.value));
                      -1 !== i && r.splice(i, 1),
                        r.length > 0
                          ? this.map.set(t.param, r)
                          : this.map.delete(t.param);
                    }
                }
              }),
              (this.cloneFrom = this.updates = null));
        }
      }
      class lB {
        constructor() {
          this.map = new Map();
        }
        set(t, n) {
          return this.map.set(t, n), this;
        }
        get(t) {
          return (
            this.map.has(t) || this.map.set(t, t.defaultValue()),
            this.map.get(t)
          );
        }
        delete(t) {
          return this.map.delete(t), this;
        }
        has(t) {
          return this.map.has(t);
        }
        keys() {
          return this.map.keys();
        }
      }
      function Yw(e) {
        return typeof ArrayBuffer < "u" && e instanceof ArrayBuffer;
      }
      function Xw(e) {
        return typeof Blob < "u" && e instanceof Blob;
      }
      function Jw(e) {
        return typeof FormData < "u" && e instanceof FormData;
      }
      class ys {
        constructor(t, n, r, i) {
          let o;
          if (
            ((this.url = n),
            (this.body = null),
            (this.reportProgress = !1),
            (this.withCredentials = !1),
            (this.responseType = "json"),
            (this.method = t.toUpperCase()),
            (function uB(e) {
              switch (e) {
                case "DELETE":
                case "GET":
                case "HEAD":
                case "OPTIONS":
                case "JSONP":
                  return !1;
                default:
                  return !0;
              }
            })(this.method) || i
              ? ((this.body = void 0 !== r ? r : null), (o = i))
              : (o = r),
            o &&
              ((this.reportProgress = !!o.reportProgress),
              (this.withCredentials = !!o.withCredentials),
              o.responseType && (this.responseType = o.responseType),
              o.headers && (this.headers = o.headers),
              o.context && (this.context = o.context),
              o.params && (this.params = o.params)),
            this.headers || (this.headers = new Rn()),
            this.context || (this.context = new lB()),
            this.params)
          ) {
            const s = this.params.toString();
            if (0 === s.length) this.urlWithParams = n;
            else {
              const a = n.indexOf("?");
              this.urlWithParams =
                n + (-1 === a ? "?" : a < n.length - 1 ? "&" : "") + s;
            }
          } else (this.params = new Yn()), (this.urlWithParams = n);
        }
        serializeBody() {
          return null === this.body
            ? null
            : Yw(this.body) ||
              Xw(this.body) ||
              Jw(this.body) ||
              (function dB(e) {
                return (
                  typeof URLSearchParams < "u" && e instanceof URLSearchParams
                );
              })(this.body) ||
              "string" == typeof this.body
            ? this.body
            : this.body instanceof Yn
            ? this.body.toString()
            : "object" == typeof this.body ||
              "boolean" == typeof this.body ||
              Array.isArray(this.body)
            ? JSON.stringify(this.body)
            : this.body.toString();
        }
        detectContentTypeHeader() {
          return null === this.body || Jw(this.body)
            ? null
            : Xw(this.body)
            ? this.body.type || null
            : Yw(this.body)
            ? null
            : "string" == typeof this.body
            ? "text/plain"
            : this.body instanceof Yn
            ? "application/x-www-form-urlencoded;charset=UTF-8"
            : "object" == typeof this.body ||
              "number" == typeof this.body ||
              "boolean" == typeof this.body
            ? "application/json"
            : null;
        }
        clone(t = {}) {
          const n = t.method || this.method,
            r = t.url || this.url,
            i = t.responseType || this.responseType,
            o = void 0 !== t.body ? t.body : this.body,
            s =
              void 0 !== t.withCredentials
                ? t.withCredentials
                : this.withCredentials,
            a =
              void 0 !== t.reportProgress
                ? t.reportProgress
                : this.reportProgress;
          let c = t.headers || this.headers,
            l = t.params || this.params;
          const u = t.context ?? this.context;
          return (
            void 0 !== t.setHeaders &&
              (c = Object.keys(t.setHeaders).reduce(
                (d, f) => d.set(f, t.setHeaders[f]),
                c
              )),
            t.setParams &&
              (l = Object.keys(t.setParams).reduce(
                (d, f) => d.set(f, t.setParams[f]),
                l
              )),
            new ys(n, r, o, {
              params: l,
              headers: c,
              context: u,
              reportProgress: a,
              responseType: i,
              withCredentials: s,
            })
          );
        }
      }
      var xh = (function (e) {
        return (
          (e[(e.Sent = 0)] = "Sent"),
          (e[(e.UploadProgress = 1)] = "UploadProgress"),
          (e[(e.ResponseHeader = 2)] = "ResponseHeader"),
          (e[(e.DownloadProgress = 3)] = "DownloadProgress"),
          (e[(e.Response = 4)] = "Response"),
          (e[(e.User = 5)] = "User"),
          e
        );
      })(xh || {});
      class fB {
        constructor(t, n = 200, r = "OK") {
          (this.headers = t.headers || new Rn()),
            (this.status = void 0 !== t.status ? t.status : n),
            (this.statusText = t.statusText || r),
            (this.url = t.url || null),
            (this.ok = this.status >= 200 && this.status < 300);
        }
      }
      class _s extends fB {
        constructor(t = {}) {
          super(t),
            (this.type = xh.Response),
            (this.body = void 0 !== t.body ? t.body : null);
        }
        clone(t = {}) {
          return new _s({
            body: void 0 !== t.body ? t.body : this.body,
            headers: t.headers || this.headers,
            status: void 0 !== t.status ? t.status : this.status,
            statusText: t.statusText || this.statusText,
            url: t.url || this.url || void 0,
          });
        }
      }
      function Ph(e, t) {
        return {
          body: t,
          headers: e.headers,
          context: e.context,
          observe: e.observe,
          params: e.params,
          reportProgress: e.reportProgress,
          responseType: e.responseType,
          withCredentials: e.withCredentials,
        };
      }
      let Fh = (() => {
        class e {
          constructor(n) {
            this.handler = n;
          }
          request(n, r, i = {}) {
            let o;
            if (n instanceof ys) o = n;
            else {
              let c, l;
              (c = i.headers instanceof Rn ? i.headers : new Rn(i.headers)),
                i.params &&
                  (l =
                    i.params instanceof Yn
                      ? i.params
                      : new Yn({ fromObject: i.params })),
                (o = new ys(n, r, void 0 !== i.body ? i.body : null, {
                  headers: c,
                  context: i.context,
                  params: l,
                  reportProgress: i.reportProgress,
                  responseType: i.responseType || "json",
                  withCredentials: i.withCredentials,
                }));
            }
            const s = R(o).pipe(Pi((c) => this.handler.handle(c)));
            if (n instanceof ys || "events" === i.observe) return s;
            const a = s.pipe(fn((c) => c instanceof _s));
            switch (i.observe || "body") {
              case "body":
                switch (o.responseType) {
                  case "arraybuffer":
                    return a.pipe(
                      U((c) => {
                        if (null !== c.body && !(c.body instanceof ArrayBuffer))
                          throw new Error("Response is not an ArrayBuffer.");
                        return c.body;
                      })
                    );
                  case "blob":
                    return a.pipe(
                      U((c) => {
                        if (null !== c.body && !(c.body instanceof Blob))
                          throw new Error("Response is not a Blob.");
                        return c.body;
                      })
                    );
                  case "text":
                    return a.pipe(
                      U((c) => {
                        if (null !== c.body && "string" != typeof c.body)
                          throw new Error("Response is not a string.");
                        return c.body;
                      })
                    );
                  default:
                    return a.pipe(U((c) => c.body));
                }
              case "response":
                return a;
              default:
                throw new Error(
                  `Unreachable: unhandled observe type ${i.observe}}`
                );
            }
          }
          delete(n, r = {}) {
            return this.request("DELETE", n, r);
          }
          get(n, r = {}) {
            return this.request("GET", n, r);
          }
          head(n, r = {}) {
            return this.request("HEAD", n, r);
          }
          jsonp(n, r) {
            return this.request("JSONP", n, {
              params: new Yn().append(r, "JSONP_CALLBACK"),
              observe: "body",
              responseType: "json",
            });
          }
          options(n, r = {}) {
            return this.request("OPTIONS", n, r);
          }
          patch(n, r, i = {}) {
            return this.request("PATCH", n, Ph(i, r));
          }
          post(n, r, i = {}) {
            return this.request("POST", n, Ph(i, r));
          }
          put(n, r, i = {}) {
            return this.request("PUT", n, Ph(i, r));
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(C(Nh));
          });
          static #t = (this.ɵprov = T({ token: e, factory: e.ɵfac }));
        }
        return e;
      })();
      const RB = ["*"];
      let Qc;
      function vs(e) {
        return (
          (function xB() {
            if (void 0 === Qc && ((Qc = null), typeof window < "u")) {
              const e = window;
              void 0 !== e.trustedTypes &&
                (Qc = e.trustedTypes.createPolicy("angular#components", {
                  createHTML: (t) => t,
                }));
            }
            return Qc;
          })()?.createHTML(e) || e
        );
      }
      function lb(e) {
        return Error(`Unable to find icon with the name "${e}"`);
      }
      function ub(e) {
        return Error(
          `The URL provided to MatIconRegistry was not trusted as a resource URL via Angular's DomSanitizer. Attempted URL was "${e}".`
        );
      }
      function db(e) {
        return Error(
          `The literal provided to MatIconRegistry was not trusted as safe HTML by Angular's DomSanitizer. Attempted literal was "${e}".`
        );
      }
      class Ar {
        constructor(t, n, r) {
          (this.url = t), (this.svgText = n), (this.options = r);
        }
      }
      let Yc = (() => {
        class e {
          constructor(n, r, i, o) {
            (this._httpClient = n),
              (this._sanitizer = r),
              (this._errorHandler = o),
              (this._svgIconConfigs = new Map()),
              (this._iconSetConfigs = new Map()),
              (this._cachedIconsByUrl = new Map()),
              (this._inProgressUrlFetches = new Map()),
              (this._fontCssClassesByAlias = new Map()),
              (this._resolvers = []),
              (this._defaultFontSetClass = [
                "material-icons",
                "mat-ligature-font",
              ]),
              (this._document = i);
          }
          addSvgIcon(n, r, i) {
            return this.addSvgIconInNamespace("", n, r, i);
          }
          addSvgIconLiteral(n, r, i) {
            return this.addSvgIconLiteralInNamespace("", n, r, i);
          }
          addSvgIconInNamespace(n, r, i, o) {
            return this._addSvgIconConfig(n, r, new Ar(i, null, o));
          }
          addSvgIconResolver(n) {
            return this._resolvers.push(n), this;
          }
          addSvgIconLiteralInNamespace(n, r, i, o) {
            const s = this._sanitizer.sanitize(Le.HTML, i);
            if (!s) throw db(i);
            const a = vs(s);
            return this._addSvgIconConfig(n, r, new Ar("", a, o));
          }
          addSvgIconSet(n, r) {
            return this.addSvgIconSetInNamespace("", n, r);
          }
          addSvgIconSetLiteral(n, r) {
            return this.addSvgIconSetLiteralInNamespace("", n, r);
          }
          addSvgIconSetInNamespace(n, r, i) {
            return this._addSvgIconSetConfig(n, new Ar(r, null, i));
          }
          addSvgIconSetLiteralInNamespace(n, r, i) {
            const o = this._sanitizer.sanitize(Le.HTML, r);
            if (!o) throw db(r);
            const s = vs(o);
            return this._addSvgIconSetConfig(n, new Ar("", s, i));
          }
          registerFontClassAlias(n, r = n) {
            return this._fontCssClassesByAlias.set(n, r), this;
          }
          classNameForFontAlias(n) {
            return this._fontCssClassesByAlias.get(n) || n;
          }
          setDefaultFontSetClass(...n) {
            return (this._defaultFontSetClass = n), this;
          }
          getDefaultFontSetClass() {
            return this._defaultFontSetClass;
          }
          getSvgIconFromUrl(n) {
            const r = this._sanitizer.sanitize(Le.RESOURCE_URL, n);
            if (!r) throw ub(n);
            const i = this._cachedIconsByUrl.get(r);
            return i
              ? R(Xc(i))
              : this._loadSvgIconFromConfig(new Ar(n, null)).pipe(
                  Ae((o) => this._cachedIconsByUrl.set(r, o)),
                  U((o) => Xc(o))
                );
          }
          getNamedSvgIcon(n, r = "") {
            const i = fb(r, n);
            let o = this._svgIconConfigs.get(i);
            if (o) return this._getSvgFromConfig(o);
            if (((o = this._getIconConfigFromResolvers(r, n)), o))
              return this._svgIconConfigs.set(i, o), this._getSvgFromConfig(o);
            const s = this._iconSetConfigs.get(r);
            return s ? this._getSvgFromIconSetConfigs(n, s) : xi(lb(i));
          }
          ngOnDestroy() {
            (this._resolvers = []),
              this._svgIconConfigs.clear(),
              this._iconSetConfigs.clear(),
              this._cachedIconsByUrl.clear();
          }
          _getSvgFromConfig(n) {
            return n.svgText
              ? R(Xc(this._svgElementFromConfig(n)))
              : this._loadSvgIconFromConfig(n).pipe(U((r) => Xc(r)));
          }
          _getSvgFromIconSetConfigs(n, r) {
            const i = this._extractIconWithNameFromAnySet(n, r);
            return i
              ? R(i)
              : (function iB(...e) {
                  const t = Op(e),
                    { args: n, keys: r } = yC(e),
                    i = new ve((o) => {
                      const { length: s } = n;
                      if (!s) return void o.complete();
                      const a = new Array(s);
                      let c = s,
                        l = s;
                      for (let u = 0; u < s; u++) {
                        let d = !1;
                        lt(n[u]).subscribe(
                          De(
                            o,
                            (f) => {
                              d || ((d = !0), l--), (a[u] = f);
                            },
                            () => c--,
                            void 0,
                            () => {
                              (!c || !d) &&
                                (l || o.next(r ? vC(r, a) : a), o.complete());
                            }
                          )
                        );
                      }
                    });
                  return t ? i.pipe(_C(t)) : i;
                })(
                  r
                    .filter((s) => !s.svgText)
                    .map((s) =>
                      this._loadSvgIconSetFromConfig(s).pipe(
                        Kn((a) => {
                          const l = `Loading icon set URL: ${this._sanitizer.sanitize(
                            Le.RESOURCE_URL,
                            s.url
                          )} failed: ${a.message}`;
                          return (
                            this._errorHandler.handleError(new Error(l)),
                            R(null)
                          );
                        })
                      )
                    )
                ).pipe(
                  U(() => {
                    const s = this._extractIconWithNameFromAnySet(n, r);
                    if (!s) throw lb(n);
                    return s;
                  })
                );
          }
          _extractIconWithNameFromAnySet(n, r) {
            for (let i = r.length - 1; i >= 0; i--) {
              const o = r[i];
              if (o.svgText && o.svgText.toString().indexOf(n) > -1) {
                const s = this._svgElementFromConfig(o),
                  a = this._extractSvgIconFromSet(s, n, o.options);
                if (a) return a;
              }
            }
            return null;
          }
          _loadSvgIconFromConfig(n) {
            return this._fetchIcon(n).pipe(
              Ae((r) => (n.svgText = r)),
              U(() => this._svgElementFromConfig(n))
            );
          }
          _loadSvgIconSetFromConfig(n) {
            return n.svgText
              ? R(null)
              : this._fetchIcon(n).pipe(Ae((r) => (n.svgText = r)));
          }
          _extractSvgIconFromSet(n, r, i) {
            const o = n.querySelector(`[id="${r}"]`);
            if (!o) return null;
            const s = o.cloneNode(!0);
            if ((s.removeAttribute("id"), "svg" === s.nodeName.toLowerCase()))
              return this._setSvgAttributes(s, i);
            if ("symbol" === s.nodeName.toLowerCase())
              return this._setSvgAttributes(this._toSvgElement(s), i);
            const a = this._svgElementFromString(vs("<svg></svg>"));
            return a.appendChild(s), this._setSvgAttributes(a, i);
          }
          _svgElementFromString(n) {
            const r = this._document.createElement("DIV");
            r.innerHTML = n;
            const i = r.querySelector("svg");
            if (!i) throw Error("<svg> tag not found");
            return i;
          }
          _toSvgElement(n) {
            const r = this._svgElementFromString(vs("<svg></svg>")),
              i = n.attributes;
            for (let o = 0; o < i.length; o++) {
              const { name: s, value: a } = i[o];
              "id" !== s && r.setAttribute(s, a);
            }
            for (let o = 0; o < n.childNodes.length; o++)
              n.childNodes[o].nodeType === this._document.ELEMENT_NODE &&
                r.appendChild(n.childNodes[o].cloneNode(!0));
            return r;
          }
          _setSvgAttributes(n, r) {
            return (
              n.setAttribute("fit", ""),
              n.setAttribute("height", "100%"),
              n.setAttribute("width", "100%"),
              n.setAttribute("preserveAspectRatio", "xMidYMid meet"),
              n.setAttribute("focusable", "false"),
              r && r.viewBox && n.setAttribute("viewBox", r.viewBox),
              n
            );
          }
          _fetchIcon(n) {
            const { url: r, options: i } = n,
              o = i?.withCredentials ?? !1;
            if (!this._httpClient)
              throw (function PB() {
                return Error(
                  "Could not find HttpClient provider for use with Angular Material icons. Please include the HttpClientModule from @angular/common/http in your app imports."
                );
              })();
            if (null == r) throw Error(`Cannot fetch icon from URL "${r}".`);
            const s = this._sanitizer.sanitize(Le.RESOURCE_URL, r);
            if (!s) throw ub(r);
            const a = this._inProgressUrlFetches.get(s);
            if (a) return a;
            const c = this._httpClient
              .get(s, { responseType: "text", withCredentials: o })
              .pipe(
                U((l) => vs(l)),
                Ic(() => this._inProgressUrlFetches.delete(s)),
                Il()
              );
            return this._inProgressUrlFetches.set(s, c), c;
          }
          _addSvgIconConfig(n, r, i) {
            return this._svgIconConfigs.set(fb(n, r), i), this;
          }
          _addSvgIconSetConfig(n, r) {
            const i = this._iconSetConfigs.get(n);
            return i ? i.push(r) : this._iconSetConfigs.set(n, [r]), this;
          }
          _svgElementFromConfig(n) {
            if (!n.svgElement) {
              const r = this._svgElementFromString(n.svgText);
              this._setSvgAttributes(r, n.options), (n.svgElement = r);
            }
            return n.svgElement;
          }
          _getIconConfigFromResolvers(n, r) {
            for (let i = 0; i < this._resolvers.length; i++) {
              const o = this._resolvers[i](r, n);
              if (o)
                return kB(o) ? new Ar(o.url, null, o.options) : new Ar(o, null);
            }
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(C(Fh, 8), C(rh), C(ye, 8), C(Nt));
          });
          static #t = (this.ɵprov = T({
            token: e,
            factory: e.ɵfac,
            providedIn: "root",
          }));
        }
        return e;
      })();
      function Xc(e) {
        return e.cloneNode(!0);
      }
      function fb(e, t) {
        return e + ":" + t;
      }
      function kB(e) {
        return !(!e.url || !e.options);
      }
      const LB = X2(
          class {
            constructor(e) {
              this._elementRef = e;
            }
          }
        ),
        jB = new E("MAT_ICON_DEFAULT_OPTIONS"),
        BB = new E("mat-icon-location", {
          providedIn: "root",
          factory: function HB() {
            const e = M(ye),
              t = e ? e.location : null;
            return { getPathname: () => (t ? t.pathname + t.search : "") };
          },
        }),
        hb = [
          "clip-path",
          "color-profile",
          "src",
          "cursor",
          "fill",
          "filter",
          "marker",
          "marker-start",
          "marker-mid",
          "marker-end",
          "mask",
          "stroke",
        ],
        VB = hb.map((e) => `[${e}]`).join(", "),
        $B = /^url\(['"]?#(.*?)['"]?\)$/;
      let UB = (() => {
          class e extends LB {
            get inline() {
              return this._inline;
            }
            set inline(n) {
              this._inline = (function M2(e) {
                return null != e && "false" != `${e}`;
              })(n);
            }
            get svgIcon() {
              return this._svgIcon;
            }
            set svgIcon(n) {
              n !== this._svgIcon &&
                (n
                  ? this._updateSvgIcon(n)
                  : this._svgIcon && this._clearSvgElement(),
                (this._svgIcon = n));
            }
            get fontSet() {
              return this._fontSet;
            }
            set fontSet(n) {
              const r = this._cleanupFontValue(n);
              r !== this._fontSet &&
                ((this._fontSet = r), this._updateFontIconClasses());
            }
            get fontIcon() {
              return this._fontIcon;
            }
            set fontIcon(n) {
              const r = this._cleanupFontValue(n);
              r !== this._fontIcon &&
                ((this._fontIcon = r), this._updateFontIconClasses());
            }
            constructor(n, r, i, o, s, a) {
              super(n),
                (this._iconRegistry = r),
                (this._location = o),
                (this._errorHandler = s),
                (this._inline = !1),
                (this._previousFontSetClass = []),
                (this._currentIconFetch = Ue.EMPTY),
                a &&
                  (a.color && (this.color = this.defaultColor = a.color),
                  a.fontSet && (this.fontSet = a.fontSet)),
                i || n.nativeElement.setAttribute("aria-hidden", "true");
            }
            _splitIconName(n) {
              if (!n) return ["", ""];
              const r = n.split(":");
              switch (r.length) {
                case 1:
                  return ["", r[0]];
                case 2:
                  return r;
                default:
                  throw Error(`Invalid icon name: "${n}"`);
              }
            }
            ngOnInit() {
              this._updateFontIconClasses();
            }
            ngAfterViewChecked() {
              const n = this._elementsWithExternalReferences;
              if (n && n.size) {
                const r = this._location.getPathname();
                r !== this._previousPath &&
                  ((this._previousPath = r), this._prependPathToReferences(r));
              }
            }
            ngOnDestroy() {
              this._currentIconFetch.unsubscribe(),
                this._elementsWithExternalReferences &&
                  this._elementsWithExternalReferences.clear();
            }
            _usingFontIcon() {
              return !this.svgIcon;
            }
            _setSvgElement(n) {
              this._clearSvgElement();
              const r = this._location.getPathname();
              (this._previousPath = r),
                this._cacheChildrenWithExternalReferences(n),
                this._prependPathToReferences(r),
                this._elementRef.nativeElement.appendChild(n);
            }
            _clearSvgElement() {
              const n = this._elementRef.nativeElement;
              let r = n.childNodes.length;
              for (
                this._elementsWithExternalReferences &&
                this._elementsWithExternalReferences.clear();
                r--;

              ) {
                const i = n.childNodes[r];
                (1 !== i.nodeType || "svg" === i.nodeName.toLowerCase()) &&
                  i.remove();
              }
            }
            _updateFontIconClasses() {
              if (!this._usingFontIcon()) return;
              const n = this._elementRef.nativeElement,
                r = (
                  this.fontSet
                    ? this._iconRegistry
                        .classNameForFontAlias(this.fontSet)
                        .split(/ +/)
                    : this._iconRegistry.getDefaultFontSetClass()
                ).filter((i) => i.length > 0);
              this._previousFontSetClass.forEach((i) => n.classList.remove(i)),
                r.forEach((i) => n.classList.add(i)),
                (this._previousFontSetClass = r),
                this.fontIcon !== this._previousFontIconClass &&
                  !r.includes("mat-ligature-font") &&
                  (this._previousFontIconClass &&
                    n.classList.remove(this._previousFontIconClass),
                  this.fontIcon && n.classList.add(this.fontIcon),
                  (this._previousFontIconClass = this.fontIcon));
            }
            _cleanupFontValue(n) {
              return "string" == typeof n ? n.trim().split(" ")[0] : n;
            }
            _prependPathToReferences(n) {
              const r = this._elementsWithExternalReferences;
              r &&
                r.forEach((i, o) => {
                  i.forEach((s) => {
                    o.setAttribute(s.name, `url('${n}#${s.value}')`);
                  });
                });
            }
            _cacheChildrenWithExternalReferences(n) {
              const r = n.querySelectorAll(VB),
                i = (this._elementsWithExternalReferences =
                  this._elementsWithExternalReferences || new Map());
              for (let o = 0; o < r.length; o++)
                hb.forEach((s) => {
                  const a = r[o],
                    c = a.getAttribute(s),
                    l = c ? c.match($B) : null;
                  if (l) {
                    let u = i.get(a);
                    u || ((u = []), i.set(a, u)),
                      u.push({ name: s, value: l[1] });
                  }
                });
            }
            _updateSvgIcon(n) {
              if (
                ((this._svgNamespace = null),
                (this._svgName = null),
                this._currentIconFetch.unsubscribe(),
                n)
              ) {
                const [r, i] = this._splitIconName(n);
                r && (this._svgNamespace = r),
                  i && (this._svgName = i),
                  (this._currentIconFetch = this._iconRegistry
                    .getNamedSvgIcon(i, r)
                    .pipe(Wn(1))
                    .subscribe(
                      (o) => this._setSvgElement(o),
                      (o) => {
                        this._errorHandler.handleError(
                          new Error(
                            `Error retrieving icon ${r}:${i}! ${o.message}`
                          )
                        );
                      }
                    ));
              }
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(
                O(on),
                O(Yc),
                ho("aria-hidden"),
                O(BB),
                O(Nt),
                O(jB, 8)
              );
            });
            static #t = (this.ɵcmp = or({
              type: e,
              selectors: [["mat-icon"]],
              hostAttrs: ["role", "img", 1, "mat-icon", "notranslate"],
              hostVars: 8,
              hostBindings: function (r, i) {
                2 & r &&
                  (ja(
                    "data-mat-icon-type",
                    i._usingFontIcon() ? "font" : "svg"
                  )("data-mat-icon-name", i._svgName || i.fontIcon)(
                    "data-mat-icon-namespace",
                    i._svgNamespace || i.fontSet
                  )("fontIcon", i._usingFontIcon() ? i.fontIcon : null),
                  Fd("mat-icon-inline", i.inline)(
                    "mat-icon-no-color",
                    "primary" !== i.color &&
                      "accent" !== i.color &&
                      "warn" !== i.color
                  ));
              },
              inputs: {
                color: "color",
                inline: "inline",
                svgIcon: "svgIcon",
                fontSet: "fontSet",
                fontIcon: "fontIcon",
              },
              exportAs: ["matIcon"],
              features: [Ed],
              ngContentSelectors: RB,
              decls: 1,
              vars: 0,
              template: function (r, i) {
                1 & r &&
                  ((function k_(e) {
                    const t = D()[Ce][Be];
                    if (!t.projection) {
                      const r = (t.projection = go(e ? e.length : 1, null)),
                        i = r.slice();
                      let o = t.child;
                      for (; null !== o; ) {
                        const s = e ? qO(o, e) : 0;
                        null !== s &&
                          (i[s] ? (i[s].projectionNext = o) : (r[s] = o),
                          (i[s] = o)),
                          (o = o.next);
                      }
                    }
                  })(),
                  (function L_(e, t = 0, n) {
                    const r = D(),
                      i = W(),
                      o = gi(i, q + e, 16, null, n || null);
                    null === o.projection && (o.projection = t),
                      tu(),
                      (!r[Dn] || Gr()) &&
                        32 != (32 & o.flags) &&
                        (function H0(e, t, n) {
                          Bm(
                            t[j],
                            0,
                            t,
                            n,
                            Tu(e, n, t),
                            xm(n.parent || t[Be], n, t)
                          );
                        })(i, r, o);
                  })(0));
              },
              styles: [
                "mat-icon,mat-icon.mat-primary,mat-icon.mat-accent,mat-icon.mat-warn{color:var(--mat-icon-color)}.mat-icon{-webkit-user-select:none;user-select:none;background-repeat:no-repeat;display:inline-block;fill:currentColor;height:24px;width:24px;overflow:hidden}.mat-icon.mat-icon-inline{font-size:inherit;height:inherit;line-height:inherit;width:inherit}.mat-icon.mat-ligature-font[fontIcon]::before{content:attr(fontIcon)}[dir=rtl] .mat-icon-rtl-mirror{transform:scale(-1, 1)}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon{display:block}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon-button .mat-icon,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon-button .mat-icon{margin:auto}",
              ],
              encapsulation: 2,
              changeDetection: 0,
            }));
          }
          return e;
        })(),
        zB = (() => {
          class e {
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵmod = dt({ type: e }));
            static #n = (this.ɵinj = tt({ imports: [zw, zw] }));
          }
          return e;
        })();
      const qB = ["menuNav"];
      let GB = (() => {
          class e {
            toggleMenu() {
              const n = this.menuNavRef.nativeElement;
              n && n.classList.toggle("active");
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵcmp = or({
              type: e,
              selectors: [["app-header"]],
              viewQuery: function (r, i) {
                if ((1 & r && MD(qB, 7), 2 & r)) {
                  let o;
                  ef(
                    (o = (function tf() {
                      return (function Ox(e, t) {
                        return e[Xt].queries[t].queryList;
                      })(D(), kg());
                    })())
                  ) && (i.menuNavRef = o.first);
                }
              },
              decls: 25,
              vars: 0,
              consts: [
                [1, "container"],
                [1, "db-icon"],
                ["href", "https://db.tec.br/", "target", "_blank"],
                ["src", "./assets/img/icon-db.svg", "alt", ""],
                [
                  "aria-label",
                  "menu",
                  "fontIcon",
                  "menu",
                  1,
                  "menu__mobile",
                  3,
                  "click",
                ],
                [1, "menu__nav"],
                [1, "menu__nav__navigation"],
                ["menuNav", ""],
                [1, "menu__nav__navigation__list"],
                [1, "menu__nav__navigation__list__item"],
                [
                  "routerLink",
                  "/",
                  1,
                  "menu__nav__navigation__list__item__name",
                ],
                [
                  "href",
                  "./assets/documents/CV-Paola-Arruee.pdf",
                  "target",
                  "_blank",
                  "download",
                  "CV-Paola-Arruee",
                  1,
                  "menu__nav__navigation__list__item__name",
                ],
                [
                  "routerLink",
                  "/projetos",
                  1,
                  "menu__nav__navigation__list__item__name",
                ],
                [1, "redes"],
                ["href", "mailto:paolaarruee@gmail.com", "target", "_blank"],
                ["src", "./assets/img/icons-menu/email.svg", "alt", ""],
                ["href", "https://github.com/paolaarruee", "target", "_blank"],
                ["src", "./assets/img/icons-menu/github.svg", "alt", ""],
                [
                  "href",
                  "https://www.linkedin.com/in/paolaarruee/",
                  "target",
                  "_blank",
                ],
                [
                  "src",
                  "./assets/img/icons-menu/linkedin.svg",
                  "alt",
                  "",
                ],
              ],
              template: function (r, i) {
                1 & r &&
                  (oe(0, "div", 0)(1, "div", 1)(2, "a", 2),
                  _t(3, "img", 3),
                  se()(),
                  oe(4, "mat-icon", 4),
                  Ua("click", function () {
                    return i.toggleMenu();
                  }),
                  se(),
                  oe(5, "div", 5)(6, "nav", 6, 7)(8, "ul", 8)(9, "li", 9)(
                    10,
                    "a",
                    10
                  ),
                  Ye(11, "Sobre"),
                  se()(),
                  oe(12, "li", 9)(13, "a", 11),
                  Ye(14, "Curr\xedculo"),
                  se()(),
                  oe(15, "li", 9)(16, "a", 12),
                  Ye(17, "Projetos"),
                  se()()()()(),
                  oe(18, "div", 13)(19, "a", 14),
                  _t(20, "img", 15),
                  se(),
                  oe(21, "a", 16),
                  _t(22, "img", 17),
                  se(),
                  oe(23, "a", 18),
                  _t(24, "img", 19),
                  se()()());
              },
              dependencies: [UB, Uc],
              styles: [
                ".container[_ngcontent-%COMP%]{padding:0 40px;max-width:100%;height:90px;background-color:#bee7f9;display:flex;align-items:center;justify-content:space-between}.container[_ngcontent-%COMP%]   .db-icon[_ngcontent-%COMP%]{height:100%;display:flex;align-items:center}.container[_ngcontent-%COMP%]   .menu__mobile[_ngcontent-%COMP%]{display:none}.container[_ngcontent-%COMP%]   .menu__nav[_ngcontent-%COMP%]{padding:0 60px}.container[_ngcontent-%COMP%]   .menu__nav__navigation__list[_ngcontent-%COMP%]{display:flex;gap:64px}.container[_ngcontent-%COMP%]   .menu__nav__navigation__list__item__name[_ngcontent-%COMP%]{font-size:18px;font-family:Montserrat;text-decoration:none;color:#201f53;font-weight:400}.container[_ngcontent-%COMP%]   .redes[_ngcontent-%COMP%]{display:flex;gap:48px}@media (max-width: 800px){.container[_ngcontent-%COMP%]   .db-icon[_ngcontent-%COMP%]{display:none}.container[_ngcontent-%COMP%]   .menu[_ngcontent-%COMP%]{display:flex;flex-direction:row;flex-direction:column;height:90px}.container[_ngcontent-%COMP%]   .menu__mobile[_ngcontent-%COMP%]{color:#201f53;display:block;cursor:pointer;font-size:30px;font-weight:300;position:absolute;width:25px;z-index:1}.container[_ngcontent-%COMP%]   .menu__nav[_ngcontent-%COMP%]{height:100%;width:100%;display:flex;justify-content:flex-start;align-items:center}.container[_ngcontent-%COMP%]   .menu__nav__navigation[_ngcontent-%COMP%]{display:none;position:fixed;top:70px;left:15px;background-color:#bee7f9;z-index:1;box-sizing:border-box;width:calc(100% - 30px);overflow-x:hidden;border-radius:6px}.container[_ngcontent-%COMP%]   .menu__nav__navigation__list[_ngcontent-%COMP%]{padding:0;display:flex;flex-direction:column}.container[_ngcontent-%COMP%]   .menu__nav__navigation__list__item[_ngcontent-%COMP%]{margin:15px 0 0}.container[_ngcontent-%COMP%]   .menu__nav__navigation.active[_ngcontent-%COMP%]{padding:30px;display:flex;box-sizing:border-box}.container[_ngcontent-%COMP%]   .redes[_ngcontent-%COMP%]{gap:28px}}",
              ],
            }));
          }
          return e;
        })(),
        WB = (() => {
          class e {
            constructor() {
              this.title = "portfolio-padrao-db";
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵcmp = or({
              type: e,
              selectors: [["app-root"]],
              decls: 3,
              vars: 0,
              consts: [[1, "container"]],
              template: function (r, i) {
                1 & r &&
                  (oe(0, "div", 0),
                  _t(1, "app-header"),
                  se(),
                  _t(2, "router-outlet"));
              },
              dependencies: [_h, GB],
            }));
          }
          return e;
        })(),
        KB = (() => {
          class e {
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵmod = dt({ type: e }));
            static #n = (this.ɵinj = tt({ imports: [qf, zB, Tw] }));
          }
          return e;
        })();
      class pb {}
      class ZB {}
      const xn = "*";
      function gb(e, t = null) {
        return { type: 2, steps: e, options: t };
      }
      function mb(e) {
        return { type: 6, styles: e, offset: null };
      }
      class Ds {
        constructor(t = 0, n = 0) {
          (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._onDestroyFns = []),
            (this._originalOnDoneFns = []),
            (this._originalOnStartFns = []),
            (this._started = !1),
            (this._destroyed = !1),
            (this._finished = !1),
            (this._position = 0),
            (this.parentPlayer = null),
            (this.totalTime = t + n);
        }
        _onFinish() {
          this._finished ||
            ((this._finished = !0),
            this._onDoneFns.forEach((t) => t()),
            (this._onDoneFns = []));
        }
        onStart(t) {
          this._originalOnStartFns.push(t), this._onStartFns.push(t);
        }
        onDone(t) {
          this._originalOnDoneFns.push(t), this._onDoneFns.push(t);
        }
        onDestroy(t) {
          this._onDestroyFns.push(t);
        }
        hasStarted() {
          return this._started;
        }
        init() {}
        play() {
          this.hasStarted() || (this._onStart(), this.triggerMicrotask()),
            (this._started = !0);
        }
        triggerMicrotask() {
          queueMicrotask(() => this._onFinish());
        }
        _onStart() {
          this._onStartFns.forEach((t) => t()), (this._onStartFns = []);
        }
        pause() {}
        restart() {}
        finish() {
          this._onFinish();
        }
        destroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this.hasStarted() || this._onStart(),
            this.finish(),
            this._onDestroyFns.forEach((t) => t()),
            (this._onDestroyFns = []));
        }
        reset() {
          (this._started = !1),
            (this._finished = !1),
            (this._onStartFns = this._originalOnStartFns),
            (this._onDoneFns = this._originalOnDoneFns);
        }
        setPosition(t) {
          this._position = this.totalTime ? t * this.totalTime : 1;
        }
        getPosition() {
          return this.totalTime ? this._position / this.totalTime : 1;
        }
        triggerCallback(t) {
          const n = "start" == t ? this._onStartFns : this._onDoneFns;
          n.forEach((r) => r()), (n.length = 0);
        }
      }
      class yb {
        constructor(t) {
          (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._finished = !1),
            (this._started = !1),
            (this._destroyed = !1),
            (this._onDestroyFns = []),
            (this.parentPlayer = null),
            (this.totalTime = 0),
            (this.players = t);
          let n = 0,
            r = 0,
            i = 0;
          const o = this.players.length;
          0 == o
            ? queueMicrotask(() => this._onFinish())
            : this.players.forEach((s) => {
                s.onDone(() => {
                  ++n == o && this._onFinish();
                }),
                  s.onDestroy(() => {
                    ++r == o && this._onDestroy();
                  }),
                  s.onStart(() => {
                    ++i == o && this._onStart();
                  });
              }),
            (this.totalTime = this.players.reduce(
              (s, a) => Math.max(s, a.totalTime),
              0
            ));
        }
        _onFinish() {
          this._finished ||
            ((this._finished = !0),
            this._onDoneFns.forEach((t) => t()),
            (this._onDoneFns = []));
        }
        init() {
          this.players.forEach((t) => t.init());
        }
        onStart(t) {
          this._onStartFns.push(t);
        }
        _onStart() {
          this.hasStarted() ||
            ((this._started = !0),
            this._onStartFns.forEach((t) => t()),
            (this._onStartFns = []));
        }
        onDone(t) {
          this._onDoneFns.push(t);
        }
        onDestroy(t) {
          this._onDestroyFns.push(t);
        }
        hasStarted() {
          return this._started;
        }
        play() {
          this.parentPlayer || this.init(),
            this._onStart(),
            this.players.forEach((t) => t.play());
        }
        pause() {
          this.players.forEach((t) => t.pause());
        }
        restart() {
          this.players.forEach((t) => t.restart());
        }
        finish() {
          this._onFinish(), this.players.forEach((t) => t.finish());
        }
        destroy() {
          this._onDestroy();
        }
        _onDestroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this._onFinish(),
            this.players.forEach((t) => t.destroy()),
            this._onDestroyFns.forEach((t) => t()),
            (this._onDestroyFns = []));
        }
        reset() {
          this.players.forEach((t) => t.reset()),
            (this._destroyed = !1),
            (this._finished = !1),
            (this._started = !1);
        }
        setPosition(t) {
          const n = t * this.totalTime;
          this.players.forEach((r) => {
            const i = r.totalTime ? Math.min(1, n / r.totalTime) : 1;
            r.setPosition(i);
          });
        }
        getPosition() {
          const t = this.players.reduce(
            (n, r) => (null === n || r.totalTime > n.totalTime ? r : n),
            null
          );
          return null != t ? t.getPosition() : 0;
        }
        beforeDestroy() {
          this.players.forEach((t) => {
            t.beforeDestroy && t.beforeDestroy();
          });
        }
        triggerCallback(t) {
          const n = "start" == t ? this._onStartFns : this._onDoneFns;
          n.forEach((r) => r()), (n.length = 0);
        }
      }
      function _b(e) {
        return new _(3e3, !1);
      }
      function Jn(e) {
        switch (e.length) {
          case 0:
            return new Ds();
          case 1:
            return e[0];
          default:
            return new yb(e);
        }
      }
      function vb(e, t, n = new Map(), r = new Map()) {
        const i = [],
          o = [];
        let s = -1,
          a = null;
        if (
          (t.forEach((c) => {
            const l = c.get("offset"),
              u = l == s,
              d = (u && a) || new Map();
            c.forEach((f, h) => {
              let p = h,
                g = f;
              if ("offset" !== h)
                switch (((p = e.normalizePropertyName(p, i)), g)) {
                  case "!":
                    g = n.get(h);
                    break;
                  case xn:
                    g = r.get(h);
                    break;
                  default:
                    g = e.normalizeStyleValue(h, p, g, i);
                }
              d.set(p, g);
            }),
              u || o.push(d),
              (a = d),
              (s = l);
          }),
          i.length)
        )
          throw (function _H(e) {
            return new _(3502, !1);
          })();
        return o;
      }
      function jh(e, t, n, r) {
        switch (t) {
          case "start":
            e.onStart(() => r(n && Bh(n, "start", e)));
            break;
          case "done":
            e.onDone(() => r(n && Bh(n, "done", e)));
            break;
          case "destroy":
            e.onDestroy(() => r(n && Bh(n, "destroy", e)));
        }
      }
      function Bh(e, t, n) {
        const o = Hh(
            e.element,
            e.triggerName,
            e.fromState,
            e.toState,
            t || e.phaseName,
            n.totalTime ?? e.totalTime,
            !!n.disabled
          ),
          s = e._data;
        return null != s && (o._data = s), o;
      }
      function Hh(e, t, n, r, i = "", o = 0, s) {
        return {
          element: e,
          triggerName: t,
          fromState: n,
          toState: r,
          phaseName: i,
          totalTime: o,
          disabled: !!s,
        };
      }
      function Dt(e, t, n) {
        let r = e.get(t);
        return r || e.set(t, (r = n)), r;
      }
      function Db(e) {
        const t = e.indexOf(":");
        return [e.substring(1, t), e.slice(t + 1)];
      }
      const OH = (() =>
        typeof document > "u" ? null : document.documentElement)();
      function Vh(e) {
        const t = e.parentNode || e.host || null;
        return t === OH ? null : t;
      }
      let Or = null,
        Eb = !1;
      function Cb(e, t) {
        for (; t; ) {
          if (t === e) return !0;
          t = Vh(t);
        }
        return !1;
      }
      function wb(e, t, n) {
        if (n) return Array.from(e.querySelectorAll(t));
        const r = e.querySelector(t);
        return r ? [r] : [];
      }
      let bb = (() => {
          class e {
            validateStyleProperty(n) {
              return (function RH(e) {
                Or ||
                  ((Or =
                    (function xH() {
                      return typeof document < "u" ? document.body : null;
                    })() || {}),
                  (Eb = !!Or.style && "WebkitAppearance" in Or.style));
                let t = !0;
                return (
                  Or.style &&
                    !(function NH(e) {
                      return "ebkit" == e.substring(1, 6);
                    })(e) &&
                    ((t = e in Or.style),
                    !t &&
                      Eb &&
                      (t =
                        "Webkit" + e.charAt(0).toUpperCase() + e.slice(1) in
                        Or.style)),
                  t
                );
              })(n);
            }
            matchesElement(n, r) {
              return !1;
            }
            containsElement(n, r) {
              return Cb(n, r);
            }
            getParentElement(n) {
              return Vh(n);
            }
            query(n, r, i) {
              return wb(n, r, i);
            }
            computeStyle(n, r, i) {
              return i || "";
            }
            animate(n, r, i, o, s, a = [], c) {
              return new Ds(i, o);
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵprov = T({ token: e, factory: e.ɵfac }));
          }
          return e;
        })(),
        $h = (() => {
          class e {
            static #e = (this.NOOP = new bb());
          }
          return e;
        })();
      const PH = 1e3,
        Uh = "ng-enter",
        Jc = "ng-leave",
        el = "ng-trigger",
        tl = ".ng-trigger",
        Ib = "ng-animating",
        zh = ".ng-animating";
      function Pn(e) {
        if ("number" == typeof e) return e;
        const t = e.match(/^(-?[\.\d]+)(m?s)/);
        return !t || t.length < 2 ? 0 : qh(parseFloat(t[1]), t[2]);
      }
      function qh(e, t) {
        return "s" === t ? e * PH : e;
      }
      function nl(e, t, n) {
        return e.hasOwnProperty("duration")
          ? e
          : (function kH(e, t, n) {
              let i,
                o = 0,
                s = "";
              if ("string" == typeof e) {
                const a = e.match(
                  /^(-?[\.\d]+)(m?s)(?:\s+(-?[\.\d]+)(m?s))?(?:\s+([-a-z]+(?:\(.+?\))?))?$/i
                );
                if (null === a)
                  return t.push(_b()), { duration: 0, delay: 0, easing: "" };
                i = qh(parseFloat(a[1]), a[2]);
                const c = a[3];
                null != c && (o = qh(parseFloat(c), a[4]));
                const l = a[5];
                l && (s = l);
              } else i = e;
              if (!n) {
                let a = !1,
                  c = t.length;
                i < 0 &&
                  (t.push(
                    (function QB() {
                      return new _(3100, !1);
                    })()
                  ),
                  (a = !0)),
                  o < 0 &&
                    (t.push(
                      (function YB() {
                        return new _(3101, !1);
                      })()
                    ),
                    (a = !0)),
                  a && t.splice(c, 0, _b());
              }
              return { duration: i, delay: o, easing: s };
            })(e, t, n);
      }
      function Es(e, t = {}) {
        return (
          Object.keys(e).forEach((n) => {
            t[n] = e[n];
          }),
          t
        );
      }
      function Sb(e) {
        const t = new Map();
        return (
          Object.keys(e).forEach((n) => {
            t.set(n, e[n]);
          }),
          t
        );
      }
      function er(e, t = new Map(), n) {
        if (n) for (let [r, i] of n) t.set(r, i);
        for (let [r, i] of e) t.set(r, i);
        return t;
      }
      function gn(e, t, n) {
        t.forEach((r, i) => {
          const o = Wh(i);
          n && !n.has(i) && n.set(i, e.style[o]), (e.style[o] = r);
        });
      }
      function Nr(e, t) {
        t.forEach((n, r) => {
          const i = Wh(r);
          e.style[i] = "";
        });
      }
      function Cs(e) {
        return Array.isArray(e) ? (1 == e.length ? e[0] : gb(e)) : e;
      }
      const Gh = new RegExp("{{\\s*(.+?)\\s*}}", "g");
      function Ab(e) {
        let t = [];
        if ("string" == typeof e) {
          let n;
          for (; (n = Gh.exec(e)); ) t.push(n[1]);
          Gh.lastIndex = 0;
        }
        return t;
      }
      function ws(e, t, n) {
        const r = e.toString(),
          i = r.replace(Gh, (o, s) => {
            let a = t[s];
            return (
              null == a &&
                (n.push(
                  (function JB(e) {
                    return new _(3003, !1);
                  })()
                ),
                (a = "")),
              a.toString()
            );
          });
        return i == r ? e : i;
      }
      function rl(e) {
        const t = [];
        let n = e.next();
        for (; !n.done; ) t.push(n.value), (n = e.next());
        return t;
      }
      const BH = /-+([a-z0-9])/g;
      function Wh(e) {
        return e.replace(BH, (...t) => t[1].toUpperCase());
      }
      function Et(e, t, n) {
        switch (t.type) {
          case 7:
            return e.visitTrigger(t, n);
          case 0:
            return e.visitState(t, n);
          case 1:
            return e.visitTransition(t, n);
          case 2:
            return e.visitSequence(t, n);
          case 3:
            return e.visitGroup(t, n);
          case 4:
            return e.visitAnimate(t, n);
          case 5:
            return e.visitKeyframes(t, n);
          case 6:
            return e.visitStyle(t, n);
          case 8:
            return e.visitReference(t, n);
          case 9:
            return e.visitAnimateChild(t, n);
          case 10:
            return e.visitAnimateRef(t, n);
          case 11:
            return e.visitQuery(t, n);
          case 12:
            return e.visitStagger(t, n);
          default:
            throw (function eH(e) {
              return new _(3004, !1);
            })();
        }
      }
      function Ob(e, t) {
        return window.getComputedStyle(e)[t];
      }
      const il = "*";
      function $H(e, t) {
        const n = [];
        return (
          "string" == typeof e
            ? e.split(/\s*,\s*/).forEach((r) =>
                (function UH(e, t, n) {
                  if (":" == e[0]) {
                    const c = (function zH(e, t) {
                      switch (e) {
                        case ":enter":
                          return "void => *";
                        case ":leave":
                          return "* => void";
                        case ":increment":
                          return (n, r) => parseFloat(r) > parseFloat(n);
                        case ":decrement":
                          return (n, r) => parseFloat(r) < parseFloat(n);
                        default:
                          return (
                            t.push(
                              (function pH(e) {
                                return new _(3016, !1);
                              })()
                            ),
                            "* => *"
                          );
                      }
                    })(e, n);
                    if ("function" == typeof c) return void t.push(c);
                    e = c;
                  }
                  const r = e.match(/^(\*|[-\w]+)\s*(<?[=-]>)\s*(\*|[-\w]+)$/);
                  if (null == r || r.length < 4)
                    return (
                      n.push(
                        (function hH(e) {
                          return new _(3015, !1);
                        })()
                      ),
                      t
                    );
                  const i = r[1],
                    o = r[2],
                    s = r[3];
                  t.push(Nb(i, s));
                  "<" == o[0] && !(i == il && s == il) && t.push(Nb(s, i));
                })(r, n, t)
              )
            : n.push(e),
          n
        );
      }
      const ol = new Set(["true", "1"]),
        sl = new Set(["false", "0"]);
      function Nb(e, t) {
        const n = ol.has(e) || sl.has(e),
          r = ol.has(t) || sl.has(t);
        return (i, o) => {
          let s = e == il || e == i,
            a = t == il || t == o;
          return (
            !s && n && "boolean" == typeof i && (s = i ? ol.has(e) : sl.has(e)),
            !a && r && "boolean" == typeof o && (a = o ? ol.has(t) : sl.has(t)),
            s && a
          );
        };
      }
      const qH = new RegExp("s*:selfs*,?", "g");
      function Kh(e, t, n, r) {
        return new GH(e).build(t, n, r);
      }
      class GH {
        constructor(t) {
          this._driver = t;
        }
        build(t, n, r) {
          const i = new ZH(n);
          return this._resetContextStyleTimingState(i), Et(this, Cs(t), i);
        }
        _resetContextStyleTimingState(t) {
          (t.currentQuerySelector = ""),
            (t.collectedStyles = new Map()),
            t.collectedStyles.set("", new Map()),
            (t.currentTime = 0);
        }
        visitTrigger(t, n) {
          let r = (n.queryCount = 0),
            i = (n.depCount = 0);
          const o = [],
            s = [];
          return (
            "@" == t.name.charAt(0) &&
              n.errors.push(
                (function nH() {
                  return new _(3006, !1);
                })()
              ),
            t.definitions.forEach((a) => {
              if ((this._resetContextStyleTimingState(n), 0 == a.type)) {
                const c = a,
                  l = c.name;
                l
                  .toString()
                  .split(/\s*,\s*/)
                  .forEach((u) => {
                    (c.name = u), o.push(this.visitState(c, n));
                  }),
                  (c.name = l);
              } else if (1 == a.type) {
                const c = this.visitTransition(a, n);
                (r += c.queryCount), (i += c.depCount), s.push(c);
              } else
                n.errors.push(
                  (function rH() {
                    return new _(3007, !1);
                  })()
                );
            }),
            {
              type: 7,
              name: t.name,
              states: o,
              transitions: s,
              queryCount: r,
              depCount: i,
              options: null,
            }
          );
        }
        visitState(t, n) {
          const r = this.visitStyle(t.styles, n),
            i = (t.options && t.options.params) || null;
          if (r.containsDynamicStyles) {
            const o = new Set(),
              s = i || {};
            r.styles.forEach((a) => {
              a instanceof Map &&
                a.forEach((c) => {
                  Ab(c).forEach((l) => {
                    s.hasOwnProperty(l) || o.add(l);
                  });
                });
            }),
              o.size &&
                (rl(o.values()),
                n.errors.push(
                  (function iH(e, t) {
                    return new _(3008, !1);
                  })()
                ));
          }
          return {
            type: 0,
            name: t.name,
            style: r,
            options: i ? { params: i } : null,
          };
        }
        visitTransition(t, n) {
          (n.queryCount = 0), (n.depCount = 0);
          const r = Et(this, Cs(t.animation), n);
          return {
            type: 1,
            matchers: $H(t.expr, n.errors),
            animation: r,
            queryCount: n.queryCount,
            depCount: n.depCount,
            options: Rr(t.options),
          };
        }
        visitSequence(t, n) {
          return {
            type: 2,
            steps: t.steps.map((r) => Et(this, r, n)),
            options: Rr(t.options),
          };
        }
        visitGroup(t, n) {
          const r = n.currentTime;
          let i = 0;
          const o = t.steps.map((s) => {
            n.currentTime = r;
            const a = Et(this, s, n);
            return (i = Math.max(i, n.currentTime)), a;
          });
          return (
            (n.currentTime = i), { type: 3, steps: o, options: Rr(t.options) }
          );
        }
        visitAnimate(t, n) {
          const r = (function YH(e, t) {
            if (e.hasOwnProperty("duration")) return e;
            if ("number" == typeof e) return Zh(nl(e, t).duration, 0, "");
            const n = e;
            if (
              n
                .split(/\s+/)
                .some((o) => "{" == o.charAt(0) && "{" == o.charAt(1))
            ) {
              const o = Zh(0, 0, "");
              return (o.dynamic = !0), (o.strValue = n), o;
            }
            const i = nl(n, t);
            return Zh(i.duration, i.delay, i.easing);
          })(t.timings, n.errors);
          n.currentAnimateTimings = r;
          let i,
            o = t.styles ? t.styles : mb({});
          if (5 == o.type) i = this.visitKeyframes(o, n);
          else {
            let s = t.styles,
              a = !1;
            if (!s) {
              a = !0;
              const l = {};
              r.easing && (l.easing = r.easing), (s = mb(l));
            }
            n.currentTime += r.duration + r.delay;
            const c = this.visitStyle(s, n);
            (c.isEmptyStep = a), (i = c);
          }
          return (
            (n.currentAnimateTimings = null),
            { type: 4, timings: r, style: i, options: null }
          );
        }
        visitStyle(t, n) {
          const r = this._makeStyleAst(t, n);
          return this._validateStyleAst(r, n), r;
        }
        _makeStyleAst(t, n) {
          const r = [],
            i = Array.isArray(t.styles) ? t.styles : [t.styles];
          for (let a of i)
            "string" == typeof a
              ? a === xn
                ? r.push(a)
                : n.errors.push(new _(3002, !1))
              : r.push(Sb(a));
          let o = !1,
            s = null;
          return (
            r.forEach((a) => {
              if (
                a instanceof Map &&
                (a.has("easing") && ((s = a.get("easing")), a.delete("easing")),
                !o)
              )
                for (let c of a.values())
                  if (c.toString().indexOf("{{") >= 0) {
                    o = !0;
                    break;
                  }
            }),
            {
              type: 6,
              styles: r,
              easing: s,
              offset: t.offset,
              containsDynamicStyles: o,
              options: null,
            }
          );
        }
        _validateStyleAst(t, n) {
          const r = n.currentAnimateTimings;
          let i = n.currentTime,
            o = n.currentTime;
          r && o > 0 && (o -= r.duration + r.delay),
            t.styles.forEach((s) => {
              "string" != typeof s &&
                s.forEach((a, c) => {
                  const l = n.collectedStyles.get(n.currentQuerySelector),
                    u = l.get(c);
                  let d = !0;
                  u &&
                    (o != i &&
                      o >= u.startTime &&
                      i <= u.endTime &&
                      (n.errors.push(
                        (function sH(e, t, n, r, i) {
                          return new _(3010, !1);
                        })()
                      ),
                      (d = !1)),
                    (o = u.startTime)),
                    d && l.set(c, { startTime: o, endTime: i }),
                    n.options &&
                      (function jH(e, t, n) {
                        const r = t.params || {},
                          i = Ab(e);
                        i.length &&
                          i.forEach((o) => {
                            r.hasOwnProperty(o) ||
                              n.push(
                                (function XB(e) {
                                  return new _(3001, !1);
                                })()
                              );
                          });
                      })(a, n.options, n.errors);
                });
            });
        }
        visitKeyframes(t, n) {
          const r = { type: 5, styles: [], options: null };
          if (!n.currentAnimateTimings)
            return (
              n.errors.push(
                (function aH() {
                  return new _(3011, !1);
                })()
              ),
              r
            );
          let o = 0;
          const s = [];
          let a = !1,
            c = !1,
            l = 0;
          const u = t.steps.map((v) => {
            const m = this._makeStyleAst(v, n);
            let b =
                null != m.offset
                  ? m.offset
                  : (function QH(e) {
                      if ("string" == typeof e) return null;
                      let t = null;
                      if (Array.isArray(e))
                        e.forEach((n) => {
                          if (n instanceof Map && n.has("offset")) {
                            const r = n;
                            (t = parseFloat(r.get("offset"))),
                              r.delete("offset");
                          }
                        });
                      else if (e instanceof Map && e.has("offset")) {
                        const n = e;
                        (t = parseFloat(n.get("offset"))), n.delete("offset");
                      }
                      return t;
                    })(m.styles),
              I = 0;
            return (
              null != b && (o++, (I = m.offset = b)),
              (c = c || I < 0 || I > 1),
              (a = a || I < l),
              (l = I),
              s.push(I),
              m
            );
          });
          c &&
            n.errors.push(
              (function cH() {
                return new _(3012, !1);
              })()
            ),
            a &&
              n.errors.push(
                (function lH() {
                  return new _(3200, !1);
                })()
              );
          const d = t.steps.length;
          let f = 0;
          o > 0 && o < d
            ? n.errors.push(
                (function uH() {
                  return new _(3202, !1);
                })()
              )
            : 0 == o && (f = 1 / (d - 1));
          const h = d - 1,
            p = n.currentTime,
            g = n.currentAnimateTimings,
            y = g.duration;
          return (
            u.forEach((v, m) => {
              const b = f > 0 ? (m == h ? 1 : f * m) : s[m],
                I = b * y;
              (n.currentTime = p + g.delay + I),
                (g.duration = I),
                this._validateStyleAst(v, n),
                (v.offset = b),
                r.styles.push(v);
            }),
            r
          );
        }
        visitReference(t, n) {
          return {
            type: 8,
            animation: Et(this, Cs(t.animation), n),
            options: Rr(t.options),
          };
        }
        visitAnimateChild(t, n) {
          return n.depCount++, { type: 9, options: Rr(t.options) };
        }
        visitAnimateRef(t, n) {
          return {
            type: 10,
            animation: this.visitReference(t.animation, n),
            options: Rr(t.options),
          };
        }
        visitQuery(t, n) {
          const r = n.currentQuerySelector,
            i = t.options || {};
          n.queryCount++, (n.currentQuery = t);
          const [o, s] = (function WH(e) {
            const t = !!e.split(/\s*,\s*/).find((n) => ":self" == n);
            return (
              t && (e = e.replace(qH, "")),
              (e = e
                .replace(/@\*/g, tl)
                .replace(/@\w+/g, (n) => tl + "-" + n.slice(1))
                .replace(/:animating/g, zh)),
              [e, t]
            );
          })(t.selector);
          (n.currentQuerySelector = r.length ? r + " " + o : o),
            Dt(n.collectedStyles, n.currentQuerySelector, new Map());
          const a = Et(this, Cs(t.animation), n);
          return (
            (n.currentQuery = null),
            (n.currentQuerySelector = r),
            {
              type: 11,
              selector: o,
              limit: i.limit || 0,
              optional: !!i.optional,
              includeSelf: s,
              animation: a,
              originalSelector: t.selector,
              options: Rr(t.options),
            }
          );
        }
        visitStagger(t, n) {
          n.currentQuery ||
            n.errors.push(
              (function dH() {
                return new _(3013, !1);
              })()
            );
          const r =
            "full" === t.timings
              ? { duration: 0, delay: 0, easing: "full" }
              : nl(t.timings, n.errors, !0);
          return {
            type: 12,
            animation: Et(this, Cs(t.animation), n),
            timings: r,
            options: null,
          };
        }
      }
      class ZH {
        constructor(t) {
          (this.errors = t),
            (this.queryCount = 0),
            (this.depCount = 0),
            (this.currentTransition = null),
            (this.currentQuery = null),
            (this.currentQuerySelector = null),
            (this.currentAnimateTimings = null),
            (this.currentTime = 0),
            (this.collectedStyles = new Map()),
            (this.options = null),
            (this.unsupportedCSSPropertiesFound = new Set());
        }
      }
      function Rr(e) {
        return (
          e
            ? (e = Es(e)).params &&
              (e.params = (function KH(e) {
                return e ? Es(e) : null;
              })(e.params))
            : (e = {}),
          e
        );
      }
      function Zh(e, t, n) {
        return { duration: e, delay: t, easing: n };
      }
      function Qh(e, t, n, r, i, o, s = null, a = !1) {
        return {
          type: 1,
          element: e,
          keyframes: t,
          preStyleProps: n,
          postStyleProps: r,
          duration: i,
          delay: o,
          totalTime: i + o,
          easing: s,
          subTimeline: a,
        };
      }
      class al {
        constructor() {
          this._map = new Map();
        }
        get(t) {
          return this._map.get(t) || [];
        }
        append(t, n) {
          let r = this._map.get(t);
          r || this._map.set(t, (r = [])), r.push(...n);
        }
        has(t) {
          return this._map.has(t);
        }
        clear() {
          this._map.clear();
        }
      }
      const eV = new RegExp(":enter", "g"),
        nV = new RegExp(":leave", "g");
      function Yh(e, t, n, r, i, o = new Map(), s = new Map(), a, c, l = []) {
        return new rV().buildKeyframes(e, t, n, r, i, o, s, a, c, l);
      }
      class rV {
        buildKeyframes(t, n, r, i, o, s, a, c, l, u = []) {
          l = l || new al();
          const d = new Xh(t, n, l, i, o, u, []);
          d.options = c;
          const f = c.delay ? Pn(c.delay) : 0;
          d.currentTimeline.delayNextStep(f),
            d.currentTimeline.setStyles([s], null, d.errors, c),
            Et(this, r, d);
          const h = d.timelines.filter((p) => p.containsAnimation());
          if (h.length && a.size) {
            let p;
            for (let g = h.length - 1; g >= 0; g--) {
              const y = h[g];
              if (y.element === n) {
                p = y;
                break;
              }
            }
            p &&
              !p.allowOnlyTimelineStyles() &&
              p.setStyles([a], null, d.errors, c);
          }
          return h.length
            ? h.map((p) => p.buildKeyframes())
            : [Qh(n, [], [], [], 0, f, "", !1)];
        }
        visitTrigger(t, n) {}
        visitState(t, n) {}
        visitTransition(t, n) {}
        visitAnimateChild(t, n) {
          const r = n.subInstructions.get(n.element);
          if (r) {
            const i = n.createSubContext(t.options),
              o = n.currentTimeline.currentTime,
              s = this._visitSubInstructions(r, i, i.options);
            o != s && n.transformIntoNewTimeline(s);
          }
          n.previousNode = t;
        }
        visitAnimateRef(t, n) {
          const r = n.createSubContext(t.options);
          r.transformIntoNewTimeline(),
            this._applyAnimationRefDelays(
              [t.options, t.animation.options],
              n,
              r
            ),
            this.visitReference(t.animation, r),
            n.transformIntoNewTimeline(r.currentTimeline.currentTime),
            (n.previousNode = t);
        }
        _applyAnimationRefDelays(t, n, r) {
          for (const i of t) {
            const o = i?.delay;
            if (o) {
              const s =
                "number" == typeof o ? o : Pn(ws(o, i?.params ?? {}, n.errors));
              r.delayNextStep(s);
            }
          }
        }
        _visitSubInstructions(t, n, r) {
          let o = n.currentTimeline.currentTime;
          const s = null != r.duration ? Pn(r.duration) : null,
            a = null != r.delay ? Pn(r.delay) : null;
          return (
            0 !== s &&
              t.forEach((c) => {
                const l = n.appendInstructionToTimeline(c, s, a);
                o = Math.max(o, l.duration + l.delay);
              }),
            o
          );
        }
        visitReference(t, n) {
          n.updateOptions(t.options, !0),
            Et(this, t.animation, n),
            (n.previousNode = t);
        }
        visitSequence(t, n) {
          const r = n.subContextCount;
          let i = n;
          const o = t.options;
          if (
            o &&
            (o.params || o.delay) &&
            ((i = n.createSubContext(o)),
            i.transformIntoNewTimeline(),
            null != o.delay)
          ) {
            6 == i.previousNode.type &&
              (i.currentTimeline.snapshotCurrentStyles(),
              (i.previousNode = cl));
            const s = Pn(o.delay);
            i.delayNextStep(s);
          }
          t.steps.length &&
            (t.steps.forEach((s) => Et(this, s, i)),
            i.currentTimeline.applyStylesToKeyframe(),
            i.subContextCount > r && i.transformIntoNewTimeline()),
            (n.previousNode = t);
        }
        visitGroup(t, n) {
          const r = [];
          let i = n.currentTimeline.currentTime;
          const o = t.options && t.options.delay ? Pn(t.options.delay) : 0;
          t.steps.forEach((s) => {
            const a = n.createSubContext(t.options);
            o && a.delayNextStep(o),
              Et(this, s, a),
              (i = Math.max(i, a.currentTimeline.currentTime)),
              r.push(a.currentTimeline);
          }),
            r.forEach((s) => n.currentTimeline.mergeTimelineCollectedStyles(s)),
            n.transformIntoNewTimeline(i),
            (n.previousNode = t);
        }
        _visitTiming(t, n) {
          if (t.dynamic) {
            const r = t.strValue;
            return nl(n.params ? ws(r, n.params, n.errors) : r, n.errors);
          }
          return { duration: t.duration, delay: t.delay, easing: t.easing };
        }
        visitAnimate(t, n) {
          const r = (n.currentAnimateTimings = this._visitTiming(t.timings, n)),
            i = n.currentTimeline;
          r.delay && (n.incrementTime(r.delay), i.snapshotCurrentStyles());
          const o = t.style;
          5 == o.type
            ? this.visitKeyframes(o, n)
            : (n.incrementTime(r.duration),
              this.visitStyle(o, n),
              i.applyStylesToKeyframe()),
            (n.currentAnimateTimings = null),
            (n.previousNode = t);
        }
        visitStyle(t, n) {
          const r = n.currentTimeline,
            i = n.currentAnimateTimings;
          !i && r.hasCurrentStyleProperties() && r.forwardFrame();
          const o = (i && i.easing) || t.easing;
          t.isEmptyStep
            ? r.applyEmptyStep(o)
            : r.setStyles(t.styles, o, n.errors, n.options),
            (n.previousNode = t);
        }
        visitKeyframes(t, n) {
          const r = n.currentAnimateTimings,
            i = n.currentTimeline.duration,
            o = r.duration,
            a = n.createSubContext().currentTimeline;
          (a.easing = r.easing),
            t.styles.forEach((c) => {
              a.forwardTime((c.offset || 0) * o),
                a.setStyles(c.styles, c.easing, n.errors, n.options),
                a.applyStylesToKeyframe();
            }),
            n.currentTimeline.mergeTimelineCollectedStyles(a),
            n.transformIntoNewTimeline(i + o),
            (n.previousNode = t);
        }
        visitQuery(t, n) {
          const r = n.currentTimeline.currentTime,
            i = t.options || {},
            o = i.delay ? Pn(i.delay) : 0;
          o &&
            (6 === n.previousNode.type ||
              (0 == r && n.currentTimeline.hasCurrentStyleProperties())) &&
            (n.currentTimeline.snapshotCurrentStyles(), (n.previousNode = cl));
          let s = r;
          const a = n.invokeQuery(
            t.selector,
            t.originalSelector,
            t.limit,
            t.includeSelf,
            !!i.optional,
            n.errors
          );
          n.currentQueryTotal = a.length;
          let c = null;
          a.forEach((l, u) => {
            n.currentQueryIndex = u;
            const d = n.createSubContext(t.options, l);
            o && d.delayNextStep(o),
              l === n.element && (c = d.currentTimeline),
              Et(this, t.animation, d),
              d.currentTimeline.applyStylesToKeyframe(),
              (s = Math.max(s, d.currentTimeline.currentTime));
          }),
            (n.currentQueryIndex = 0),
            (n.currentQueryTotal = 0),
            n.transformIntoNewTimeline(s),
            c &&
              (n.currentTimeline.mergeTimelineCollectedStyles(c),
              n.currentTimeline.snapshotCurrentStyles()),
            (n.previousNode = t);
        }
        visitStagger(t, n) {
          const r = n.parentContext,
            i = n.currentTimeline,
            o = t.timings,
            s = Math.abs(o.duration),
            a = s * (n.currentQueryTotal - 1);
          let c = s * n.currentQueryIndex;
          switch (o.duration < 0 ? "reverse" : o.easing) {
            case "reverse":
              c = a - c;
              break;
            case "full":
              c = r.currentStaggerTime;
          }
          const u = n.currentTimeline;
          c && u.delayNextStep(c);
          const d = u.currentTime;
          Et(this, t.animation, n),
            (n.previousNode = t),
            (r.currentStaggerTime =
              i.currentTime - d + (i.startTime - r.currentTimeline.startTime));
        }
      }
      const cl = {};
      class Xh {
        constructor(t, n, r, i, o, s, a, c) {
          (this._driver = t),
            (this.element = n),
            (this.subInstructions = r),
            (this._enterClassName = i),
            (this._leaveClassName = o),
            (this.errors = s),
            (this.timelines = a),
            (this.parentContext = null),
            (this.currentAnimateTimings = null),
            (this.previousNode = cl),
            (this.subContextCount = 0),
            (this.options = {}),
            (this.currentQueryIndex = 0),
            (this.currentQueryTotal = 0),
            (this.currentStaggerTime = 0),
            (this.currentTimeline = c || new ll(this._driver, n, 0)),
            a.push(this.currentTimeline);
        }
        get params() {
          return this.options.params;
        }
        updateOptions(t, n) {
          if (!t) return;
          const r = t;
          let i = this.options;
          null != r.duration && (i.duration = Pn(r.duration)),
            null != r.delay && (i.delay = Pn(r.delay));
          const o = r.params;
          if (o) {
            let s = i.params;
            s || (s = this.options.params = {}),
              Object.keys(o).forEach((a) => {
                (!n || !s.hasOwnProperty(a)) &&
                  (s[a] = ws(o[a], s, this.errors));
              });
          }
        }
        _copyOptions() {
          const t = {};
          if (this.options) {
            const n = this.options.params;
            if (n) {
              const r = (t.params = {});
              Object.keys(n).forEach((i) => {
                r[i] = n[i];
              });
            }
          }
          return t;
        }
        createSubContext(t = null, n, r) {
          const i = n || this.element,
            o = new Xh(
              this._driver,
              i,
              this.subInstructions,
              this._enterClassName,
              this._leaveClassName,
              this.errors,
              this.timelines,
              this.currentTimeline.fork(i, r || 0)
            );
          return (
            (o.previousNode = this.previousNode),
            (o.currentAnimateTimings = this.currentAnimateTimings),
            (o.options = this._copyOptions()),
            o.updateOptions(t),
            (o.currentQueryIndex = this.currentQueryIndex),
            (o.currentQueryTotal = this.currentQueryTotal),
            (o.parentContext = this),
            this.subContextCount++,
            o
          );
        }
        transformIntoNewTimeline(t) {
          return (
            (this.previousNode = cl),
            (this.currentTimeline = this.currentTimeline.fork(this.element, t)),
            this.timelines.push(this.currentTimeline),
            this.currentTimeline
          );
        }
        appendInstructionToTimeline(t, n, r) {
          const i = {
              duration: n ?? t.duration,
              delay: this.currentTimeline.currentTime + (r ?? 0) + t.delay,
              easing: "",
            },
            o = new iV(
              this._driver,
              t.element,
              t.keyframes,
              t.preStyleProps,
              t.postStyleProps,
              i,
              t.stretchStartingKeyframe
            );
          return this.timelines.push(o), i;
        }
        incrementTime(t) {
          this.currentTimeline.forwardTime(this.currentTimeline.duration + t);
        }
        delayNextStep(t) {
          t > 0 && this.currentTimeline.delayNextStep(t);
        }
        invokeQuery(t, n, r, i, o, s) {
          let a = [];
          if ((i && a.push(this.element), t.length > 0)) {
            t = (t = t.replace(eV, "." + this._enterClassName)).replace(
              nV,
              "." + this._leaveClassName
            );
            let l = this._driver.query(this.element, t, 1 != r);
            0 !== r &&
              (l = r < 0 ? l.slice(l.length + r, l.length) : l.slice(0, r)),
              a.push(...l);
          }
          return (
            !o &&
              0 == a.length &&
              s.push(
                (function fH(e) {
                  return new _(3014, !1);
                })()
              ),
            a
          );
        }
      }
      class ll {
        constructor(t, n, r, i) {
          (this._driver = t),
            (this.element = n),
            (this.startTime = r),
            (this._elementTimelineStylesLookup = i),
            (this.duration = 0),
            (this.easing = null),
            (this._previousKeyframe = new Map()),
            (this._currentKeyframe = new Map()),
            (this._keyframes = new Map()),
            (this._styleSummary = new Map()),
            (this._localTimelineStyles = new Map()),
            (this._pendingStyles = new Map()),
            (this._backFill = new Map()),
            (this._currentEmptyStepKeyframe = null),
            this._elementTimelineStylesLookup ||
              (this._elementTimelineStylesLookup = new Map()),
            (this._globalTimelineStyles =
              this._elementTimelineStylesLookup.get(n)),
            this._globalTimelineStyles ||
              ((this._globalTimelineStyles = this._localTimelineStyles),
              this._elementTimelineStylesLookup.set(
                n,
                this._localTimelineStyles
              )),
            this._loadKeyframe();
        }
        containsAnimation() {
          switch (this._keyframes.size) {
            case 0:
              return !1;
            case 1:
              return this.hasCurrentStyleProperties();
            default:
              return !0;
          }
        }
        hasCurrentStyleProperties() {
          return this._currentKeyframe.size > 0;
        }
        get currentTime() {
          return this.startTime + this.duration;
        }
        delayNextStep(t) {
          const n = 1 === this._keyframes.size && this._pendingStyles.size;
          this.duration || n
            ? (this.forwardTime(this.currentTime + t),
              n && this.snapshotCurrentStyles())
            : (this.startTime += t);
        }
        fork(t, n) {
          return (
            this.applyStylesToKeyframe(),
            new ll(
              this._driver,
              t,
              n || this.currentTime,
              this._elementTimelineStylesLookup
            )
          );
        }
        _loadKeyframe() {
          this._currentKeyframe &&
            (this._previousKeyframe = this._currentKeyframe),
            (this._currentKeyframe = this._keyframes.get(this.duration)),
            this._currentKeyframe ||
              ((this._currentKeyframe = new Map()),
              this._keyframes.set(this.duration, this._currentKeyframe));
        }
        forwardFrame() {
          (this.duration += 1), this._loadKeyframe();
        }
        forwardTime(t) {
          this.applyStylesToKeyframe(),
            (this.duration = t),
            this._loadKeyframe();
        }
        _updateStyle(t, n) {
          this._localTimelineStyles.set(t, n),
            this._globalTimelineStyles.set(t, n),
            this._styleSummary.set(t, { time: this.currentTime, value: n });
        }
        allowOnlyTimelineStyles() {
          return this._currentEmptyStepKeyframe !== this._currentKeyframe;
        }
        applyEmptyStep(t) {
          t && this._previousKeyframe.set("easing", t);
          for (let [n, r] of this._globalTimelineStyles)
            this._backFill.set(n, r || xn), this._currentKeyframe.set(n, xn);
          this._currentEmptyStepKeyframe = this._currentKeyframe;
        }
        setStyles(t, n, r, i) {
          n && this._previousKeyframe.set("easing", n);
          const o = (i && i.params) || {},
            s = (function oV(e, t) {
              const n = new Map();
              let r;
              return (
                e.forEach((i) => {
                  if ("*" === i) {
                    r = r || t.keys();
                    for (let o of r) n.set(o, xn);
                  } else er(i, n);
                }),
                n
              );
            })(t, this._globalTimelineStyles);
          for (let [a, c] of s) {
            const l = ws(c, o, r);
            this._pendingStyles.set(a, l),
              this._localTimelineStyles.has(a) ||
                this._backFill.set(a, this._globalTimelineStyles.get(a) ?? xn),
              this._updateStyle(a, l);
          }
        }
        applyStylesToKeyframe() {
          0 != this._pendingStyles.size &&
            (this._pendingStyles.forEach((t, n) => {
              this._currentKeyframe.set(n, t);
            }),
            this._pendingStyles.clear(),
            this._localTimelineStyles.forEach((t, n) => {
              this._currentKeyframe.has(n) || this._currentKeyframe.set(n, t);
            }));
        }
        snapshotCurrentStyles() {
          for (let [t, n] of this._localTimelineStyles)
            this._pendingStyles.set(t, n), this._updateStyle(t, n);
        }
        getFinalKeyframe() {
          return this._keyframes.get(this.duration);
        }
        get properties() {
          const t = [];
          for (let n in this._currentKeyframe) t.push(n);
          return t;
        }
        mergeTimelineCollectedStyles(t) {
          t._styleSummary.forEach((n, r) => {
            const i = this._styleSummary.get(r);
            (!i || n.time > i.time) && this._updateStyle(r, n.value);
          });
        }
        buildKeyframes() {
          this.applyStylesToKeyframe();
          const t = new Set(),
            n = new Set(),
            r = 1 === this._keyframes.size && 0 === this.duration;
          let i = [];
          this._keyframes.forEach((a, c) => {
            const l = er(a, new Map(), this._backFill);
            l.forEach((u, d) => {
              "!" === u ? t.add(d) : u === xn && n.add(d);
            }),
              r || l.set("offset", c / this.duration),
              i.push(l);
          });
          const o = t.size ? rl(t.values()) : [],
            s = n.size ? rl(n.values()) : [];
          if (r) {
            const a = i[0],
              c = new Map(a);
            a.set("offset", 0), c.set("offset", 1), (i = [a, c]);
          }
          return Qh(
            this.element,
            i,
            o,
            s,
            this.duration,
            this.startTime,
            this.easing,
            !1
          );
        }
      }
      class iV extends ll {
        constructor(t, n, r, i, o, s, a = !1) {
          super(t, n, s.delay),
            (this.keyframes = r),
            (this.preStyleProps = i),
            (this.postStyleProps = o),
            (this._stretchStartingKeyframe = a),
            (this.timings = {
              duration: s.duration,
              delay: s.delay,
              easing: s.easing,
            });
        }
        containsAnimation() {
          return this.keyframes.length > 1;
        }
        buildKeyframes() {
          let t = this.keyframes,
            { delay: n, duration: r, easing: i } = this.timings;
          if (this._stretchStartingKeyframe && n) {
            const o = [],
              s = r + n,
              a = n / s,
              c = er(t[0]);
            c.set("offset", 0), o.push(c);
            const l = er(t[0]);
            l.set("offset", Pb(a)), o.push(l);
            const u = t.length - 1;
            for (let d = 1; d <= u; d++) {
              let f = er(t[d]);
              const h = f.get("offset");
              f.set("offset", Pb((n + h * r) / s)), o.push(f);
            }
            (r = s), (n = 0), (i = ""), (t = o);
          }
          return Qh(
            this.element,
            t,
            this.preStyleProps,
            this.postStyleProps,
            r,
            n,
            i,
            !0
          );
        }
      }
      function Pb(e, t = 3) {
        const n = Math.pow(10, t - 1);
        return Math.round(e * n) / n;
      }
      class Jh {}
      const sV = new Set([
        "width",
        "height",
        "minWidth",
        "minHeight",
        "maxWidth",
        "maxHeight",
        "left",
        "top",
        "bottom",
        "right",
        "fontSize",
        "outlineWidth",
        "outlineOffset",
        "paddingTop",
        "paddingLeft",
        "paddingBottom",
        "paddingRight",
        "marginTop",
        "marginLeft",
        "marginBottom",
        "marginRight",
        "borderRadius",
        "borderWidth",
        "borderTopWidth",
        "borderLeftWidth",
        "borderRightWidth",
        "borderBottomWidth",
        "textIndent",
        "perspective",
      ]);
      class aV extends Jh {
        normalizePropertyName(t, n) {
          return Wh(t);
        }
        normalizeStyleValue(t, n, r, i) {
          let o = "";
          const s = r.toString().trim();
          if (sV.has(n) && 0 !== r && "0" !== r)
            if ("number" == typeof r) o = "px";
            else {
              const a = r.match(/^[+-]?[\d\.]+([a-z]*)$/);
              a &&
                0 == a[1].length &&
                i.push(
                  (function tH(e, t) {
                    return new _(3005, !1);
                  })()
                );
            }
          return s + o;
        }
      }
      function Fb(e, t, n, r, i, o, s, a, c, l, u, d, f) {
        return {
          type: 0,
          element: e,
          triggerName: t,
          isRemovalTransition: i,
          fromState: n,
          fromStyles: o,
          toState: r,
          toStyles: s,
          timelines: a,
          queriedElements: c,
          preStyleProps: l,
          postStyleProps: u,
          totalTime: d,
          errors: f,
        };
      }
      const ep = {};
      class kb {
        constructor(t, n, r) {
          (this._triggerName = t), (this.ast = n), (this._stateStyles = r);
        }
        match(t, n, r, i) {
          return (function cV(e, t, n, r, i) {
            return e.some((o) => o(t, n, r, i));
          })(this.ast.matchers, t, n, r, i);
        }
        buildStyles(t, n, r) {
          let i = this._stateStyles.get("*");
          return (
            void 0 !== t && (i = this._stateStyles.get(t?.toString()) || i),
            i ? i.buildStyles(n, r) : new Map()
          );
        }
        build(t, n, r, i, o, s, a, c, l, u) {
          const d = [],
            f = (this.ast.options && this.ast.options.params) || ep,
            p = this.buildStyles(r, (a && a.params) || ep, d),
            g = (c && c.params) || ep,
            y = this.buildStyles(i, g, d),
            v = new Set(),
            m = new Map(),
            b = new Map(),
            I = "void" === i,
            B = { params: lV(g, f), delay: this.ast.options?.delay },
            ie = u ? [] : Yh(t, n, this.ast.animation, o, s, p, y, B, l, d);
          let fe = 0;
          if (
            (ie.forEach((Ct) => {
              fe = Math.max(Ct.duration + Ct.delay, fe);
            }),
            d.length)
          )
            return Fb(n, this._triggerName, r, i, I, p, y, [], [], m, b, fe, d);
          ie.forEach((Ct) => {
            const Kt = Ct.element,
              hl = Dt(m, Kt, new Set());
            Ct.preStyleProps.forEach((xr) => hl.add(xr));
            const Ms = Dt(b, Kt, new Set());
            Ct.postStyleProps.forEach((xr) => Ms.add(xr)),
              Kt !== n && v.add(Kt);
          });
          const je = rl(v.values());
          return Fb(n, this._triggerName, r, i, I, p, y, ie, je, m, b, fe);
        }
      }
      function lV(e, t) {
        const n = Es(t);
        for (const r in e) e.hasOwnProperty(r) && null != e[r] && (n[r] = e[r]);
        return n;
      }
      class uV {
        constructor(t, n, r) {
          (this.styles = t), (this.defaultParams = n), (this.normalizer = r);
        }
        buildStyles(t, n) {
          const r = new Map(),
            i = Es(this.defaultParams);
          return (
            Object.keys(t).forEach((o) => {
              const s = t[o];
              null !== s && (i[o] = s);
            }),
            this.styles.styles.forEach((o) => {
              "string" != typeof o &&
                o.forEach((s, a) => {
                  s && (s = ws(s, i, n));
                  const c = this.normalizer.normalizePropertyName(a, n);
                  (s = this.normalizer.normalizeStyleValue(a, c, s, n)),
                    r.set(a, s);
                });
            }),
            r
          );
        }
      }
      class fV {
        constructor(t, n, r) {
          (this.name = t),
            (this.ast = n),
            (this._normalizer = r),
            (this.transitionFactories = []),
            (this.states = new Map()),
            n.states.forEach((i) => {
              this.states.set(
                i.name,
                new uV(i.style, (i.options && i.options.params) || {}, r)
              );
            }),
            Lb(this.states, "true", "1"),
            Lb(this.states, "false", "0"),
            n.transitions.forEach((i) => {
              this.transitionFactories.push(new kb(t, i, this.states));
            }),
            (this.fallbackTransition = (function hV(e, t, n) {
              return new kb(
                e,
                {
                  type: 1,
                  animation: { type: 2, steps: [], options: null },
                  matchers: [(s, a) => !0],
                  options: null,
                  queryCount: 0,
                  depCount: 0,
                },
                t
              );
            })(t, this.states));
        }
        get containsQueries() {
          return this.ast.queryCount > 0;
        }
        matchTransition(t, n, r, i) {
          return (
            this.transitionFactories.find((s) => s.match(t, n, r, i)) || null
          );
        }
        matchStyles(t, n, r) {
          return this.fallbackTransition.buildStyles(t, n, r);
        }
      }
      function Lb(e, t, n) {
        e.has(t)
          ? e.has(n) || e.set(n, e.get(t))
          : e.has(n) && e.set(t, e.get(n));
      }
      const pV = new al();
      class gV {
        constructor(t, n, r) {
          (this.bodyNode = t),
            (this._driver = n),
            (this._normalizer = r),
            (this._animations = new Map()),
            (this._playersById = new Map()),
            (this.players = []);
        }
        register(t, n) {
          const r = [],
            o = Kh(this._driver, n, r, []);
          if (r.length)
            throw (function vH(e) {
              return new _(3503, !1);
            })();
          this._animations.set(t, o);
        }
        _buildPlayer(t, n, r) {
          const i = t.element,
            o = vb(this._normalizer, t.keyframes, n, r);
          return this._driver.animate(
            i,
            o,
            t.duration,
            t.delay,
            t.easing,
            [],
            !0
          );
        }
        create(t, n, r = {}) {
          const i = [],
            o = this._animations.get(t);
          let s;
          const a = new Map();
          if (
            (o
              ? ((s = Yh(
                  this._driver,
                  n,
                  o,
                  Uh,
                  Jc,
                  new Map(),
                  new Map(),
                  r,
                  pV,
                  i
                )),
                s.forEach((u) => {
                  const d = Dt(a, u.element, new Map());
                  u.postStyleProps.forEach((f) => d.set(f, null));
                }))
              : (i.push(
                  (function DH() {
                    return new _(3300, !1);
                  })()
                ),
                (s = [])),
            i.length)
          )
            throw (function EH(e) {
              return new _(3504, !1);
            })();
          a.forEach((u, d) => {
            u.forEach((f, h) => {
              u.set(h, this._driver.computeStyle(d, h, xn));
            });
          });
          const l = Jn(
            s.map((u) => {
              const d = a.get(u.element);
              return this._buildPlayer(u, new Map(), d);
            })
          );
          return (
            this._playersById.set(t, l),
            l.onDestroy(() => this.destroy(t)),
            this.players.push(l),
            l
          );
        }
        destroy(t) {
          const n = this._getPlayer(t);
          n.destroy(), this._playersById.delete(t);
          const r = this.players.indexOf(n);
          r >= 0 && this.players.splice(r, 1);
        }
        _getPlayer(t) {
          const n = this._playersById.get(t);
          if (!n)
            throw (function CH(e) {
              return new _(3301, !1);
            })();
          return n;
        }
        listen(t, n, r, i) {
          const o = Hh(n, "", "", "");
          return jh(this._getPlayer(t), r, o, i), () => {};
        }
        command(t, n, r, i) {
          if ("register" == r) return void this.register(t, i[0]);
          if ("create" == r) return void this.create(t, n, i[0] || {});
          const o = this._getPlayer(t);
          switch (r) {
            case "play":
              o.play();
              break;
            case "pause":
              o.pause();
              break;
            case "reset":
              o.reset();
              break;
            case "restart":
              o.restart();
              break;
            case "finish":
              o.finish();
              break;
            case "init":
              o.init();
              break;
            case "setPosition":
              o.setPosition(parseFloat(i[0]));
              break;
            case "destroy":
              this.destroy(t);
          }
        }
      }
      const jb = "ng-animate-queued",
        tp = "ng-animate-disabled",
        DV = [],
        Bb = {
          namespaceId: "",
          setForRemoval: !1,
          setForMove: !1,
          hasAnimation: !1,
          removedBeforeQueried: !1,
        },
        EV = {
          namespaceId: "",
          setForMove: !1,
          setForRemoval: !1,
          hasAnimation: !1,
          removedBeforeQueried: !0,
        },
        Wt = "__ng_removed";
      class np {
        get params() {
          return this.options.params;
        }
        constructor(t, n = "") {
          this.namespaceId = n;
          const r = t && t.hasOwnProperty("value");
          if (
            ((this.value = (function MV(e) {
              return e ?? null;
            })(r ? t.value : t)),
            r)
          ) {
            const o = Es(t);
            delete o.value, (this.options = o);
          } else this.options = {};
          this.options.params || (this.options.params = {});
        }
        absorbOptions(t) {
          const n = t.params;
          if (n) {
            const r = this.options.params;
            Object.keys(n).forEach((i) => {
              null == r[i] && (r[i] = n[i]);
            });
          }
        }
      }
      const bs = "void",
        rp = new np(bs);
      class CV {
        constructor(t, n, r) {
          (this.id = t),
            (this.hostElement = n),
            (this._engine = r),
            (this.players = []),
            (this._triggers = new Map()),
            (this._queue = []),
            (this._elementListeners = new Map()),
            (this._hostClassName = "ng-tns-" + t),
            kt(n, this._hostClassName);
        }
        listen(t, n, r, i) {
          if (!this._triggers.has(n))
            throw (function wH(e, t) {
              return new _(3302, !1);
            })();
          if (null == r || 0 == r.length)
            throw (function bH(e) {
              return new _(3303, !1);
            })();
          if (
            !(function IV(e) {
              return "start" == e || "done" == e;
            })(r)
          )
            throw (function MH(e, t) {
              return new _(3400, !1);
            })();
          const o = Dt(this._elementListeners, t, []),
            s = { name: n, phase: r, callback: i };
          o.push(s);
          const a = Dt(this._engine.statesByElement, t, new Map());
          return (
            a.has(n) || (kt(t, el), kt(t, el + "-" + n), a.set(n, rp)),
            () => {
              this._engine.afterFlush(() => {
                const c = o.indexOf(s);
                c >= 0 && o.splice(c, 1), this._triggers.has(n) || a.delete(n);
              });
            }
          );
        }
        register(t, n) {
          return !this._triggers.has(t) && (this._triggers.set(t, n), !0);
        }
        _getTrigger(t) {
          const n = this._triggers.get(t);
          if (!n)
            throw (function IH(e) {
              return new _(3401, !1);
            })();
          return n;
        }
        trigger(t, n, r, i = !0) {
          const o = this._getTrigger(n),
            s = new ip(this.id, n, t);
          let a = this._engine.statesByElement.get(t);
          a ||
            (kt(t, el),
            kt(t, el + "-" + n),
            this._engine.statesByElement.set(t, (a = new Map())));
          let c = a.get(n);
          const l = new np(r, this.id);
          if (
            (!(r && r.hasOwnProperty("value")) &&
              c &&
              l.absorbOptions(c.options),
            a.set(n, l),
            c || (c = rp),
            l.value !== bs && c.value === l.value)
          ) {
            if (
              !(function AV(e, t) {
                const n = Object.keys(e),
                  r = Object.keys(t);
                if (n.length != r.length) return !1;
                for (let i = 0; i < n.length; i++) {
                  const o = n[i];
                  if (!t.hasOwnProperty(o) || e[o] !== t[o]) return !1;
                }
                return !0;
              })(c.params, l.params)
            ) {
              const g = [],
                y = o.matchStyles(c.value, c.params, g),
                v = o.matchStyles(l.value, l.params, g);
              g.length
                ? this._engine.reportError(g)
                : this._engine.afterFlush(() => {
                    Nr(t, y), gn(t, v);
                  });
            }
            return;
          }
          const f = Dt(this._engine.playersByElement, t, []);
          f.forEach((g) => {
            g.namespaceId == this.id &&
              g.triggerName == n &&
              g.queued &&
              g.destroy();
          });
          let h = o.matchTransition(c.value, l.value, t, l.params),
            p = !1;
          if (!h) {
            if (!i) return;
            (h = o.fallbackTransition), (p = !0);
          }
          return (
            this._engine.totalQueuedPlayers++,
            this._queue.push({
              element: t,
              triggerName: n,
              transition: h,
              fromState: c,
              toState: l,
              player: s,
              isFallbackTransition: p,
            }),
            p ||
              (kt(t, jb),
              s.onStart(() => {
                qi(t, jb);
              })),
            s.onDone(() => {
              let g = this.players.indexOf(s);
              g >= 0 && this.players.splice(g, 1);
              const y = this._engine.playersByElement.get(t);
              if (y) {
                let v = y.indexOf(s);
                v >= 0 && y.splice(v, 1);
              }
            }),
            this.players.push(s),
            f.push(s),
            s
          );
        }
        deregister(t) {
          this._triggers.delete(t),
            this._engine.statesByElement.forEach((n) => n.delete(t)),
            this._elementListeners.forEach((n, r) => {
              this._elementListeners.set(
                r,
                n.filter((i) => i.name != t)
              );
            });
        }
        clearElementCache(t) {
          this._engine.statesByElement.delete(t),
            this._elementListeners.delete(t);
          const n = this._engine.playersByElement.get(t);
          n &&
            (n.forEach((r) => r.destroy()),
            this._engine.playersByElement.delete(t));
        }
        _signalRemovalForInnerTriggers(t, n) {
          const r = this._engine.driver.query(t, tl, !0);
          r.forEach((i) => {
            if (i[Wt]) return;
            const o = this._engine.fetchNamespacesByElement(i);
            o.size
              ? o.forEach((s) => s.triggerLeaveAnimation(i, n, !1, !0))
              : this.clearElementCache(i);
          }),
            this._engine.afterFlushAnimationsDone(() =>
              r.forEach((i) => this.clearElementCache(i))
            );
        }
        triggerLeaveAnimation(t, n, r, i) {
          const o = this._engine.statesByElement.get(t),
            s = new Map();
          if (o) {
            const a = [];
            if (
              (o.forEach((c, l) => {
                if ((s.set(l, c.value), this._triggers.has(l))) {
                  const u = this.trigger(t, l, bs, i);
                  u && a.push(u);
                }
              }),
              a.length)
            )
              return (
                this._engine.markElementAsRemoved(this.id, t, !0, n, s),
                r && Jn(a).onDone(() => this._engine.processLeaveNode(t)),
                !0
              );
          }
          return !1;
        }
        prepareLeaveAnimationListeners(t) {
          const n = this._elementListeners.get(t),
            r = this._engine.statesByElement.get(t);
          if (n && r) {
            const i = new Set();
            n.forEach((o) => {
              const s = o.name;
              if (i.has(s)) return;
              i.add(s);
              const c = this._triggers.get(s).fallbackTransition,
                l = r.get(s) || rp,
                u = new np(bs),
                d = new ip(this.id, s, t);
              this._engine.totalQueuedPlayers++,
                this._queue.push({
                  element: t,
                  triggerName: s,
                  transition: c,
                  fromState: l,
                  toState: u,
                  player: d,
                  isFallbackTransition: !0,
                });
            });
          }
        }
        removeNode(t, n) {
          const r = this._engine;
          if (
            (t.childElementCount && this._signalRemovalForInnerTriggers(t, n),
            this.triggerLeaveAnimation(t, n, !0))
          )
            return;
          let i = !1;
          if (r.totalAnimations) {
            const o = r.players.length ? r.playersByQueriedElement.get(t) : [];
            if (o && o.length) i = !0;
            else {
              let s = t;
              for (; (s = s.parentNode); )
                if (r.statesByElement.get(s)) {
                  i = !0;
                  break;
                }
            }
          }
          if ((this.prepareLeaveAnimationListeners(t), i))
            r.markElementAsRemoved(this.id, t, !1, n);
          else {
            const o = t[Wt];
            (!o || o === Bb) &&
              (r.afterFlush(() => this.clearElementCache(t)),
              r.destroyInnerAnimations(t),
              r._onRemovalComplete(t, n));
          }
        }
        insertNode(t, n) {
          kt(t, this._hostClassName);
        }
        drainQueuedTransitions(t) {
          const n = [];
          return (
            this._queue.forEach((r) => {
              const i = r.player;
              if (i.destroyed) return;
              const o = r.element,
                s = this._elementListeners.get(o);
              s &&
                s.forEach((a) => {
                  if (a.name == r.triggerName) {
                    const c = Hh(
                      o,
                      r.triggerName,
                      r.fromState.value,
                      r.toState.value
                    );
                    (c._data = t), jh(r.player, a.phase, c, a.callback);
                  }
                }),
                i.markedForDestroy
                  ? this._engine.afterFlush(() => {
                      i.destroy();
                    })
                  : n.push(r);
            }),
            (this._queue = []),
            n.sort((r, i) => {
              const o = r.transition.ast.depCount,
                s = i.transition.ast.depCount;
              return 0 == o || 0 == s
                ? o - s
                : this._engine.driver.containsElement(r.element, i.element)
                ? 1
                : -1;
            })
          );
        }
        destroy(t) {
          this.players.forEach((n) => n.destroy()),
            this._signalRemovalForInnerTriggers(this.hostElement, t);
        }
      }
      class wV {
        _onRemovalComplete(t, n) {
          this.onRemovalComplete(t, n);
        }
        constructor(t, n, r) {
          (this.bodyNode = t),
            (this.driver = n),
            (this._normalizer = r),
            (this.players = []),
            (this.newHostElements = new Map()),
            (this.playersByElement = new Map()),
            (this.playersByQueriedElement = new Map()),
            (this.statesByElement = new Map()),
            (this.disabledNodes = new Set()),
            (this.totalAnimations = 0),
            (this.totalQueuedPlayers = 0),
            (this._namespaceLookup = {}),
            (this._namespaceList = []),
            (this._flushFns = []),
            (this._whenQuietFns = []),
            (this.namespacesByHostElement = new Map()),
            (this.collectedEnterElements = []),
            (this.collectedLeaveElements = []),
            (this.onRemovalComplete = (i, o) => {});
        }
        get queuedPlayers() {
          const t = [];
          return (
            this._namespaceList.forEach((n) => {
              n.players.forEach((r) => {
                r.queued && t.push(r);
              });
            }),
            t
          );
        }
        createNamespace(t, n) {
          const r = new CV(t, n, this);
          return (
            this.bodyNode && this.driver.containsElement(this.bodyNode, n)
              ? this._balanceNamespaceList(r, n)
              : (this.newHostElements.set(n, r), this.collectEnterElement(n)),
            (this._namespaceLookup[t] = r)
          );
        }
        _balanceNamespaceList(t, n) {
          const r = this._namespaceList,
            i = this.namespacesByHostElement;
          if (r.length - 1 >= 0) {
            let s = !1,
              a = this.driver.getParentElement(n);
            for (; a; ) {
              const c = i.get(a);
              if (c) {
                const l = r.indexOf(c);
                r.splice(l + 1, 0, t), (s = !0);
                break;
              }
              a = this.driver.getParentElement(a);
            }
            s || r.unshift(t);
          } else r.push(t);
          return i.set(n, t), t;
        }
        register(t, n) {
          let r = this._namespaceLookup[t];
          return r || (r = this.createNamespace(t, n)), r;
        }
        registerTrigger(t, n, r) {
          let i = this._namespaceLookup[t];
          i && i.register(n, r) && this.totalAnimations++;
        }
        destroy(t, n) {
          t &&
            (this.afterFlush(() => {}),
            this.afterFlushAnimationsDone(() => {
              const r = this._fetchNamespace(t);
              this.namespacesByHostElement.delete(r.hostElement);
              const i = this._namespaceList.indexOf(r);
              i >= 0 && this._namespaceList.splice(i, 1),
                r.destroy(n),
                delete this._namespaceLookup[t];
            }));
        }
        _fetchNamespace(t) {
          return this._namespaceLookup[t];
        }
        fetchNamespacesByElement(t) {
          const n = new Set(),
            r = this.statesByElement.get(t);
          if (r)
            for (let i of r.values())
              if (i.namespaceId) {
                const o = this._fetchNamespace(i.namespaceId);
                o && n.add(o);
              }
          return n;
        }
        trigger(t, n, r, i) {
          if (ul(n)) {
            const o = this._fetchNamespace(t);
            if (o) return o.trigger(n, r, i), !0;
          }
          return !1;
        }
        insertNode(t, n, r, i) {
          if (!ul(n)) return;
          const o = n[Wt];
          if (o && o.setForRemoval) {
            (o.setForRemoval = !1), (o.setForMove = !0);
            const s = this.collectedLeaveElements.indexOf(n);
            s >= 0 && this.collectedLeaveElements.splice(s, 1);
          }
          if (t) {
            const s = this._fetchNamespace(t);
            s && s.insertNode(n, r);
          }
          i && this.collectEnterElement(n);
        }
        collectEnterElement(t) {
          this.collectedEnterElements.push(t);
        }
        markElementAsDisabled(t, n) {
          n
            ? this.disabledNodes.has(t) ||
              (this.disabledNodes.add(t), kt(t, tp))
            : this.disabledNodes.has(t) &&
              (this.disabledNodes.delete(t), qi(t, tp));
        }
        removeNode(t, n, r) {
          if (ul(n)) {
            const i = t ? this._fetchNamespace(t) : null;
            i ? i.removeNode(n, r) : this.markElementAsRemoved(t, n, !1, r);
            const o = this.namespacesByHostElement.get(n);
            o && o.id !== t && o.removeNode(n, r);
          } else this._onRemovalComplete(n, r);
        }
        markElementAsRemoved(t, n, r, i, o) {
          this.collectedLeaveElements.push(n),
            (n[Wt] = {
              namespaceId: t,
              setForRemoval: i,
              hasAnimation: r,
              removedBeforeQueried: !1,
              previousTriggersValues: o,
            });
        }
        listen(t, n, r, i, o) {
          return ul(n) ? this._fetchNamespace(t).listen(n, r, i, o) : () => {};
        }
        _buildInstruction(t, n, r, i, o) {
          return t.transition.build(
            this.driver,
            t.element,
            t.fromState.value,
            t.toState.value,
            r,
            i,
            t.fromState.options,
            t.toState.options,
            n,
            o
          );
        }
        destroyInnerAnimations(t) {
          let n = this.driver.query(t, tl, !0);
          n.forEach((r) => this.destroyActiveAnimationsForElement(r)),
            0 != this.playersByQueriedElement.size &&
              ((n = this.driver.query(t, zh, !0)),
              n.forEach((r) => this.finishActiveQueriedAnimationOnElement(r)));
        }
        destroyActiveAnimationsForElement(t) {
          const n = this.playersByElement.get(t);
          n &&
            n.forEach((r) => {
              r.queued ? (r.markedForDestroy = !0) : r.destroy();
            });
        }
        finishActiveQueriedAnimationOnElement(t) {
          const n = this.playersByQueriedElement.get(t);
          n && n.forEach((r) => r.finish());
        }
        whenRenderingDone() {
          return new Promise((t) => {
            if (this.players.length) return Jn(this.players).onDone(() => t());
            t();
          });
        }
        processLeaveNode(t) {
          const n = t[Wt];
          if (n && n.setForRemoval) {
            if (((t[Wt] = Bb), n.namespaceId)) {
              this.destroyInnerAnimations(t);
              const r = this._fetchNamespace(n.namespaceId);
              r && r.clearElementCache(t);
            }
            this._onRemovalComplete(t, n.setForRemoval);
          }
          t.classList?.contains(tp) && this.markElementAsDisabled(t, !1),
            this.driver.query(t, ".ng-animate-disabled", !0).forEach((r) => {
              this.markElementAsDisabled(r, !1);
            });
        }
        flush(t = -1) {
          let n = [];
          if (
            (this.newHostElements.size &&
              (this.newHostElements.forEach((r, i) =>
                this._balanceNamespaceList(r, i)
              ),
              this.newHostElements.clear()),
            this.totalAnimations && this.collectedEnterElements.length)
          )
            for (let r = 0; r < this.collectedEnterElements.length; r++)
              kt(this.collectedEnterElements[r], "ng-star-inserted");
          if (
            this._namespaceList.length &&
            (this.totalQueuedPlayers || this.collectedLeaveElements.length)
          ) {
            const r = [];
            try {
              n = this._flushAnimations(r, t);
            } finally {
              for (let i = 0; i < r.length; i++) r[i]();
            }
          } else
            for (let r = 0; r < this.collectedLeaveElements.length; r++)
              this.processLeaveNode(this.collectedLeaveElements[r]);
          if (
            ((this.totalQueuedPlayers = 0),
            (this.collectedEnterElements.length = 0),
            (this.collectedLeaveElements.length = 0),
            this._flushFns.forEach((r) => r()),
            (this._flushFns = []),
            this._whenQuietFns.length)
          ) {
            const r = this._whenQuietFns;
            (this._whenQuietFns = []),
              n.length
                ? Jn(n).onDone(() => {
                    r.forEach((i) => i());
                  })
                : r.forEach((i) => i());
          }
        }
        reportError(t) {
          throw (function SH(e) {
            return new _(3402, !1);
          })();
        }
        _flushAnimations(t, n) {
          const r = new al(),
            i = [],
            o = new Map(),
            s = [],
            a = new Map(),
            c = new Map(),
            l = new Map(),
            u = new Set();
          this.disabledNodes.forEach((S) => {
            u.add(S);
            const N = this.driver.query(S, ".ng-animate-queued", !0);
            for (let x = 0; x < N.length; x++) u.add(N[x]);
          });
          const d = this.bodyNode,
            f = Array.from(this.statesByElement.keys()),
            h = $b(f, this.collectedEnterElements),
            p = new Map();
          let g = 0;
          h.forEach((S, N) => {
            const x = Uh + g++;
            p.set(N, x), S.forEach((K) => kt(K, x));
          });
          const y = [],
            v = new Set(),
            m = new Set();
          for (let S = 0; S < this.collectedLeaveElements.length; S++) {
            const N = this.collectedLeaveElements[S],
              x = N[Wt];
            x &&
              x.setForRemoval &&
              (y.push(N),
              v.add(N),
              x.hasAnimation
                ? this.driver
                    .query(N, ".ng-star-inserted", !0)
                    .forEach((K) => v.add(K))
                : m.add(N));
          }
          const b = new Map(),
            I = $b(f, Array.from(v));
          I.forEach((S, N) => {
            const x = Jc + g++;
            b.set(N, x), S.forEach((K) => kt(K, x));
          }),
            t.push(() => {
              h.forEach((S, N) => {
                const x = p.get(N);
                S.forEach((K) => qi(K, x));
              }),
                I.forEach((S, N) => {
                  const x = b.get(N);
                  S.forEach((K) => qi(K, x));
                }),
                y.forEach((S) => {
                  this.processLeaveNode(S);
                });
            });
          const B = [],
            ie = [];
          for (let S = this._namespaceList.length - 1; S >= 0; S--)
            this._namespaceList[S].drainQueuedTransitions(n).forEach((x) => {
              const K = x.player,
                Oe = x.element;
              if ((B.push(K), this.collectedEnterElements.length)) {
                const $e = Oe[Wt];
                if ($e && $e.setForMove) {
                  if (
                    $e.previousTriggersValues &&
                    $e.previousTriggersValues.has(x.triggerName)
                  ) {
                    const Pr = $e.previousTriggersValues.get(x.triggerName),
                      Lt = this.statesByElement.get(x.element);
                    if (Lt && Lt.has(x.triggerName)) {
                      const pl = Lt.get(x.triggerName);
                      (pl.value = Pr), Lt.set(x.triggerName, pl);
                    }
                  }
                  return void K.destroy();
                }
              }
              const mn = !d || !this.driver.containsElement(d, Oe),
                wt = b.get(Oe),
                tr = p.get(Oe),
                ge = this._buildInstruction(x, r, tr, wt, mn);
              if (ge.errors && ge.errors.length) return void ie.push(ge);
              if (mn)
                return (
                  K.onStart(() => Nr(Oe, ge.fromStyles)),
                  K.onDestroy(() => gn(Oe, ge.toStyles)),
                  void i.push(K)
                );
              if (x.isFallbackTransition)
                return (
                  K.onStart(() => Nr(Oe, ge.fromStyles)),
                  K.onDestroy(() => gn(Oe, ge.toStyles)),
                  void i.push(K)
                );
              const Jb = [];
              ge.timelines.forEach(($e) => {
                ($e.stretchStartingKeyframe = !0),
                  this.disabledNodes.has($e.element) || Jb.push($e);
              }),
                (ge.timelines = Jb),
                r.append(Oe, ge.timelines),
                s.push({ instruction: ge, player: K, element: Oe }),
                ge.queriedElements.forEach(($e) => Dt(a, $e, []).push(K)),
                ge.preStyleProps.forEach(($e, Pr) => {
                  if ($e.size) {
                    let Lt = c.get(Pr);
                    Lt || c.set(Pr, (Lt = new Set())),
                      $e.forEach((pl, ap) => Lt.add(ap));
                  }
                }),
                ge.postStyleProps.forEach(($e, Pr) => {
                  let Lt = l.get(Pr);
                  Lt || l.set(Pr, (Lt = new Set())),
                    $e.forEach((pl, ap) => Lt.add(ap));
                });
            });
          if (ie.length) {
            const S = [];
            ie.forEach((N) => {
              S.push(
                (function TH(e, t) {
                  return new _(3505, !1);
                })()
              );
            }),
              B.forEach((N) => N.destroy()),
              this.reportError(S);
          }
          const fe = new Map(),
            je = new Map();
          s.forEach((S) => {
            const N = S.element;
            r.has(N) &&
              (je.set(N, N),
              this._beforeAnimationBuild(
                S.player.namespaceId,
                S.instruction,
                fe
              ));
          }),
            i.forEach((S) => {
              const N = S.element;
              this._getPreviousPlayers(
                N,
                !1,
                S.namespaceId,
                S.triggerName,
                null
              ).forEach((K) => {
                Dt(fe, N, []).push(K), K.destroy();
              });
            });
          const Ct = y.filter((S) => zb(S, c, l)),
            Kt = new Map();
          Vb(Kt, this.driver, m, l, xn).forEach((S) => {
            zb(S, c, l) && Ct.push(S);
          });
          const Ms = new Map();
          h.forEach((S, N) => {
            Vb(Ms, this.driver, new Set(S), c, "!");
          }),
            Ct.forEach((S) => {
              const N = Kt.get(S),
                x = Ms.get(S);
              Kt.set(
                S,
                new Map([...(N?.entries() ?? []), ...(x?.entries() ?? [])])
              );
            });
          const xr = [],
            Yb = [],
            Xb = {};
          s.forEach((S) => {
            const { element: N, player: x, instruction: K } = S;
            if (r.has(N)) {
              if (u.has(N))
                return (
                  x.onDestroy(() => gn(N, K.toStyles)),
                  (x.disabled = !0),
                  x.overrideTotalTime(K.totalTime),
                  void i.push(x)
                );
              let Oe = Xb;
              if (je.size > 1) {
                let wt = N;
                const tr = [];
                for (; (wt = wt.parentNode); ) {
                  const ge = je.get(wt);
                  if (ge) {
                    Oe = ge;
                    break;
                  }
                  tr.push(wt);
                }
                tr.forEach((ge) => je.set(ge, Oe));
              }
              const mn = this._buildAnimation(x.namespaceId, K, fe, o, Ms, Kt);
              if ((x.setRealPlayer(mn), Oe === Xb)) xr.push(x);
              else {
                const wt = this.playersByElement.get(Oe);
                wt && wt.length && (x.parentPlayer = Jn(wt)), i.push(x);
              }
            } else
              Nr(N, K.fromStyles),
                x.onDestroy(() => gn(N, K.toStyles)),
                Yb.push(x),
                u.has(N) && i.push(x);
          }),
            Yb.forEach((S) => {
              const N = o.get(S.element);
              if (N && N.length) {
                const x = Jn(N);
                S.setRealPlayer(x);
              }
            }),
            i.forEach((S) => {
              S.parentPlayer ? S.syncPlayerEvents(S.parentPlayer) : S.destroy();
            });
          for (let S = 0; S < y.length; S++) {
            const N = y[S],
              x = N[Wt];
            if ((qi(N, Jc), x && x.hasAnimation)) continue;
            let K = [];
            if (a.size) {
              let mn = a.get(N);
              mn && mn.length && K.push(...mn);
              let wt = this.driver.query(N, zh, !0);
              for (let tr = 0; tr < wt.length; tr++) {
                let ge = a.get(wt[tr]);
                ge && ge.length && K.push(...ge);
              }
            }
            const Oe = K.filter((mn) => !mn.destroyed);
            Oe.length ? SV(this, N, Oe) : this.processLeaveNode(N);
          }
          return (
            (y.length = 0),
            xr.forEach((S) => {
              this.players.push(S),
                S.onDone(() => {
                  S.destroy();
                  const N = this.players.indexOf(S);
                  this.players.splice(N, 1);
                }),
                S.play();
            }),
            xr
          );
        }
        afterFlush(t) {
          this._flushFns.push(t);
        }
        afterFlushAnimationsDone(t) {
          this._whenQuietFns.push(t);
        }
        _getPreviousPlayers(t, n, r, i, o) {
          let s = [];
          if (n) {
            const a = this.playersByQueriedElement.get(t);
            a && (s = a);
          } else {
            const a = this.playersByElement.get(t);
            if (a) {
              const c = !o || o == bs;
              a.forEach((l) => {
                l.queued || (!c && l.triggerName != i) || s.push(l);
              });
            }
          }
          return (
            (r || i) &&
              (s = s.filter(
                (a) => !((r && r != a.namespaceId) || (i && i != a.triggerName))
              )),
            s
          );
        }
        _beforeAnimationBuild(t, n, r) {
          const o = n.element,
            s = n.isRemovalTransition ? void 0 : t,
            a = n.isRemovalTransition ? void 0 : n.triggerName;
          for (const c of n.timelines) {
            const l = c.element,
              u = l !== o,
              d = Dt(r, l, []);
            this._getPreviousPlayers(l, u, s, a, n.toState).forEach((h) => {
              const p = h.getRealPlayer();
              p.beforeDestroy && p.beforeDestroy(), h.destroy(), d.push(h);
            });
          }
          Nr(o, n.fromStyles);
        }
        _buildAnimation(t, n, r, i, o, s) {
          const a = n.triggerName,
            c = n.element,
            l = [],
            u = new Set(),
            d = new Set(),
            f = n.timelines.map((p) => {
              const g = p.element;
              u.add(g);
              const y = g[Wt];
              if (y && y.removedBeforeQueried)
                return new Ds(p.duration, p.delay);
              const v = g !== c,
                m = (function TV(e) {
                  const t = [];
                  return Ub(e, t), t;
                })((r.get(g) || DV).map((fe) => fe.getRealPlayer())).filter(
                  (fe) => !!fe.element && fe.element === g
                ),
                b = o.get(g),
                I = s.get(g),
                B = vb(this._normalizer, p.keyframes, b, I),
                ie = this._buildPlayer(p, B, m);
              if ((p.subTimeline && i && d.add(g), v)) {
                const fe = new ip(t, a, g);
                fe.setRealPlayer(ie), l.push(fe);
              }
              return ie;
            });
          l.forEach((p) => {
            Dt(this.playersByQueriedElement, p.element, []).push(p),
              p.onDone(() =>
                (function bV(e, t, n) {
                  let r = e.get(t);
                  if (r) {
                    if (r.length) {
                      const i = r.indexOf(n);
                      r.splice(i, 1);
                    }
                    0 == r.length && e.delete(t);
                  }
                  return r;
                })(this.playersByQueriedElement, p.element, p)
              );
          }),
            u.forEach((p) => kt(p, Ib));
          const h = Jn(f);
          return (
            h.onDestroy(() => {
              u.forEach((p) => qi(p, Ib)), gn(c, n.toStyles);
            }),
            d.forEach((p) => {
              Dt(i, p, []).push(h);
            }),
            h
          );
        }
        _buildPlayer(t, n, r) {
          return n.length > 0
            ? this.driver.animate(
                t.element,
                n,
                t.duration,
                t.delay,
                t.easing,
                r
              )
            : new Ds(t.duration, t.delay);
        }
      }
      class ip {
        constructor(t, n, r) {
          (this.namespaceId = t),
            (this.triggerName = n),
            (this.element = r),
            (this._player = new Ds()),
            (this._containsRealPlayer = !1),
            (this._queuedCallbacks = new Map()),
            (this.destroyed = !1),
            (this.parentPlayer = null),
            (this.markedForDestroy = !1),
            (this.disabled = !1),
            (this.queued = !0),
            (this.totalTime = 0);
        }
        setRealPlayer(t) {
          this._containsRealPlayer ||
            ((this._player = t),
            this._queuedCallbacks.forEach((n, r) => {
              n.forEach((i) => jh(t, r, void 0, i));
            }),
            this._queuedCallbacks.clear(),
            (this._containsRealPlayer = !0),
            this.overrideTotalTime(t.totalTime),
            (this.queued = !1));
        }
        getRealPlayer() {
          return this._player;
        }
        overrideTotalTime(t) {
          this.totalTime = t;
        }
        syncPlayerEvents(t) {
          const n = this._player;
          n.triggerCallback && t.onStart(() => n.triggerCallback("start")),
            t.onDone(() => this.finish()),
            t.onDestroy(() => this.destroy());
        }
        _queueEvent(t, n) {
          Dt(this._queuedCallbacks, t, []).push(n);
        }
        onDone(t) {
          this.queued && this._queueEvent("done", t), this._player.onDone(t);
        }
        onStart(t) {
          this.queued && this._queueEvent("start", t), this._player.onStart(t);
        }
        onDestroy(t) {
          this.queued && this._queueEvent("destroy", t),
            this._player.onDestroy(t);
        }
        init() {
          this._player.init();
        }
        hasStarted() {
          return !this.queued && this._player.hasStarted();
        }
        play() {
          !this.queued && this._player.play();
        }
        pause() {
          !this.queued && this._player.pause();
        }
        restart() {
          !this.queued && this._player.restart();
        }
        finish() {
          this._player.finish();
        }
        destroy() {
          (this.destroyed = !0), this._player.destroy();
        }
        reset() {
          !this.queued && this._player.reset();
        }
        setPosition(t) {
          this.queued || this._player.setPosition(t);
        }
        getPosition() {
          return this.queued ? 0 : this._player.getPosition();
        }
        triggerCallback(t) {
          const n = this._player;
          n.triggerCallback && n.triggerCallback(t);
        }
      }
      function ul(e) {
        return e && 1 === e.nodeType;
      }
      function Hb(e, t) {
        const n = e.style.display;
        return (e.style.display = t ?? "none"), n;
      }
      function Vb(e, t, n, r, i) {
        const o = [];
        n.forEach((c) => o.push(Hb(c)));
        const s = [];
        r.forEach((c, l) => {
          const u = new Map();
          c.forEach((d) => {
            const f = t.computeStyle(l, d, i);
            u.set(d, f), (!f || 0 == f.length) && ((l[Wt] = EV), s.push(l));
          }),
            e.set(l, u);
        });
        let a = 0;
        return n.forEach((c) => Hb(c, o[a++])), s;
      }
      function $b(e, t) {
        const n = new Map();
        if ((e.forEach((a) => n.set(a, [])), 0 == t.length)) return n;
        const i = new Set(t),
          o = new Map();
        function s(a) {
          if (!a) return 1;
          let c = o.get(a);
          if (c) return c;
          const l = a.parentNode;
          return (c = n.has(l) ? l : i.has(l) ? 1 : s(l)), o.set(a, c), c;
        }
        return (
          t.forEach((a) => {
            const c = s(a);
            1 !== c && n.get(c).push(a);
          }),
          n
        );
      }
      function kt(e, t) {
        e.classList?.add(t);
      }
      function qi(e, t) {
        e.classList?.remove(t);
      }
      function SV(e, t, n) {
        Jn(n).onDone(() => e.processLeaveNode(t));
      }
      function Ub(e, t) {
        for (let n = 0; n < e.length; n++) {
          const r = e[n];
          r instanceof yb ? Ub(r.players, t) : t.push(r);
        }
      }
      function zb(e, t, n) {
        const r = n.get(e);
        if (!r) return !1;
        let i = t.get(e);
        return i ? r.forEach((o) => i.add(o)) : t.set(e, r), n.delete(e), !0;
      }
      class dl {
        constructor(t, n, r) {
          (this.bodyNode = t),
            (this._driver = n),
            (this._normalizer = r),
            (this._triggerCache = {}),
            (this.onRemovalComplete = (i, o) => {}),
            (this._transitionEngine = new wV(t, n, r)),
            (this._timelineEngine = new gV(t, n, r)),
            (this._transitionEngine.onRemovalComplete = (i, o) =>
              this.onRemovalComplete(i, o));
        }
        registerTrigger(t, n, r, i, o) {
          const s = t + "-" + i;
          let a = this._triggerCache[s];
          if (!a) {
            const c = [],
              u = Kh(this._driver, o, c, []);
            if (c.length)
              throw (function yH(e, t) {
                return new _(3404, !1);
              })();
            (a = (function dV(e, t, n) {
              return new fV(e, t, n);
            })(i, u, this._normalizer)),
              (this._triggerCache[s] = a);
          }
          this._transitionEngine.registerTrigger(n, i, a);
        }
        register(t, n) {
          this._transitionEngine.register(t, n);
        }
        destroy(t, n) {
          this._transitionEngine.destroy(t, n);
        }
        onInsert(t, n, r, i) {
          this._transitionEngine.insertNode(t, n, r, i);
        }
        onRemove(t, n, r) {
          this._transitionEngine.removeNode(t, n, r);
        }
        disableAnimations(t, n) {
          this._transitionEngine.markElementAsDisabled(t, n);
        }
        process(t, n, r, i) {
          if ("@" == r.charAt(0)) {
            const [o, s] = Db(r);
            this._timelineEngine.command(o, n, s, i);
          } else this._transitionEngine.trigger(t, n, r, i);
        }
        listen(t, n, r, i, o) {
          if ("@" == r.charAt(0)) {
            const [s, a] = Db(r);
            return this._timelineEngine.listen(s, n, a, o);
          }
          return this._transitionEngine.listen(t, n, r, i, o);
        }
        flush(t = -1) {
          this._transitionEngine.flush(t);
        }
        get players() {
          return [
            ...this._transitionEngine.players,
            ...this._timelineEngine.players,
          ];
        }
        whenRenderingDone() {
          return this._transitionEngine.whenRenderingDone();
        }
        afterFlushAnimationsDone(t) {
          this._transitionEngine.afterFlushAnimationsDone(t);
        }
      }
      let NV = (() => {
        class e {
          static #e = (this.initialStylesByElement = new WeakMap());
          constructor(n, r, i) {
            (this._element = n),
              (this._startStyles = r),
              (this._endStyles = i),
              (this._state = 0);
            let o = e.initialStylesByElement.get(n);
            o || e.initialStylesByElement.set(n, (o = new Map())),
              (this._initialStyles = o);
          }
          start() {
            this._state < 1 &&
              (this._startStyles &&
                gn(this._element, this._startStyles, this._initialStyles),
              (this._state = 1));
          }
          finish() {
            this.start(),
              this._state < 2 &&
                (gn(this._element, this._initialStyles),
                this._endStyles &&
                  (gn(this._element, this._endStyles),
                  (this._endStyles = null)),
                (this._state = 1));
          }
          destroy() {
            this.finish(),
              this._state < 3 &&
                (e.initialStylesByElement.delete(this._element),
                this._startStyles &&
                  (Nr(this._element, this._startStyles),
                  (this._endStyles = null)),
                this._endStyles &&
                  (Nr(this._element, this._endStyles),
                  (this._endStyles = null)),
                gn(this._element, this._initialStyles),
                (this._state = 3));
          }
        }
        return e;
      })();
      function op(e) {
        let t = null;
        return (
          e.forEach((n, r) => {
            (function RV(e) {
              return "display" === e || "position" === e;
            })(r) && ((t = t || new Map()), t.set(r, n));
          }),
          t
        );
      }
      class qb {
        constructor(t, n, r, i) {
          (this.element = t),
            (this.keyframes = n),
            (this.options = r),
            (this._specialStyles = i),
            (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._onDestroyFns = []),
            (this._initialized = !1),
            (this._finished = !1),
            (this._started = !1),
            (this._destroyed = !1),
            (this._originalOnDoneFns = []),
            (this._originalOnStartFns = []),
            (this.time = 0),
            (this.parentPlayer = null),
            (this.currentSnapshot = new Map()),
            (this._duration = r.duration),
            (this._delay = r.delay || 0),
            (this.time = this._duration + this._delay);
        }
        _onFinish() {
          this._finished ||
            ((this._finished = !0),
            this._onDoneFns.forEach((t) => t()),
            (this._onDoneFns = []));
        }
        init() {
          this._buildPlayer(), this._preparePlayerBeforeStart();
        }
        _buildPlayer() {
          if (this._initialized) return;
          this._initialized = !0;
          const t = this.keyframes;
          (this.domPlayer = this._triggerWebAnimation(
            this.element,
            t,
            this.options
          )),
            (this._finalKeyframe = t.length ? t[t.length - 1] : new Map());
          const n = () => this._onFinish();
          this.domPlayer.addEventListener("finish", n),
            this.onDestroy(() => {
              this.domPlayer.removeEventListener("finish", n);
            });
        }
        _preparePlayerBeforeStart() {
          this._delay ? this._resetDomPlayerState() : this.domPlayer.pause();
        }
        _convertKeyframesToObject(t) {
          const n = [];
          return (
            t.forEach((r) => {
              n.push(Object.fromEntries(r));
            }),
            n
          );
        }
        _triggerWebAnimation(t, n, r) {
          return t.animate(this._convertKeyframesToObject(n), r);
        }
        onStart(t) {
          this._originalOnStartFns.push(t), this._onStartFns.push(t);
        }
        onDone(t) {
          this._originalOnDoneFns.push(t), this._onDoneFns.push(t);
        }
        onDestroy(t) {
          this._onDestroyFns.push(t);
        }
        play() {
          this._buildPlayer(),
            this.hasStarted() ||
              (this._onStartFns.forEach((t) => t()),
              (this._onStartFns = []),
              (this._started = !0),
              this._specialStyles && this._specialStyles.start()),
            this.domPlayer.play();
        }
        pause() {
          this.init(), this.domPlayer.pause();
        }
        finish() {
          this.init(),
            this._specialStyles && this._specialStyles.finish(),
            this._onFinish(),
            this.domPlayer.finish();
        }
        reset() {
          this._resetDomPlayerState(),
            (this._destroyed = !1),
            (this._finished = !1),
            (this._started = !1),
            (this._onStartFns = this._originalOnStartFns),
            (this._onDoneFns = this._originalOnDoneFns);
        }
        _resetDomPlayerState() {
          this.domPlayer && this.domPlayer.cancel();
        }
        restart() {
          this.reset(), this.play();
        }
        hasStarted() {
          return this._started;
        }
        destroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this._resetDomPlayerState(),
            this._onFinish(),
            this._specialStyles && this._specialStyles.destroy(),
            this._onDestroyFns.forEach((t) => t()),
            (this._onDestroyFns = []));
        }
        setPosition(t) {
          void 0 === this.domPlayer && this.init(),
            (this.domPlayer.currentTime = t * this.time);
        }
        getPosition() {
          return +(this.domPlayer.currentTime ?? 0) / this.time;
        }
        get totalTime() {
          return this._delay + this._duration;
        }
        beforeDestroy() {
          const t = new Map();
          this.hasStarted() &&
            this._finalKeyframe.forEach((r, i) => {
              "offset" !== i &&
                t.set(i, this._finished ? r : Ob(this.element, i));
            }),
            (this.currentSnapshot = t);
        }
        triggerCallback(t) {
          const n = "start" === t ? this._onStartFns : this._onDoneFns;
          n.forEach((r) => r()), (n.length = 0);
        }
      }
      class xV {
        validateStyleProperty(t) {
          return !0;
        }
        validateAnimatableStyleProperty(t) {
          return !0;
        }
        matchesElement(t, n) {
          return !1;
        }
        containsElement(t, n) {
          return Cb(t, n);
        }
        getParentElement(t) {
          return Vh(t);
        }
        query(t, n, r) {
          return wb(t, n, r);
        }
        computeStyle(t, n, r) {
          return window.getComputedStyle(t)[n];
        }
        animate(t, n, r, i, o, s = []) {
          const c = {
            duration: r,
            delay: i,
            fill: 0 == i ? "both" : "forwards",
          };
          o && (c.easing = o);
          const l = new Map(),
            u = s.filter((h) => h instanceof qb);
          (function HH(e, t) {
            return 0 === e || 0 === t;
          })(r, i) &&
            u.forEach((h) => {
              h.currentSnapshot.forEach((p, g) => l.set(g, p));
            });
          let d = (function LH(e) {
            return e.length
              ? e[0] instanceof Map
                ? e
                : e.map((t) => Sb(t))
              : [];
          })(n).map((h) => er(h));
          d = (function VH(e, t, n) {
            if (n.size && t.length) {
              let r = t[0],
                i = [];
              if (
                (n.forEach((o, s) => {
                  r.has(s) || i.push(s), r.set(s, o);
                }),
                i.length)
              )
                for (let o = 1; o < t.length; o++) {
                  let s = t[o];
                  i.forEach((a) => s.set(a, Ob(e, a)));
                }
            }
            return t;
          })(t, d, l);
          const f = (function OV(e, t) {
            let n = null,
              r = null;
            return (
              Array.isArray(t) && t.length
                ? ((n = op(t[0])), t.length > 1 && (r = op(t[t.length - 1])))
                : t instanceof Map && (n = op(t)),
              n || r ? new NV(e, n, r) : null
            );
          })(t, d);
          return new qb(t, d, c, f);
        }
      }
      let PV = (() => {
        class e extends pb {
          constructor(n, r) {
            super(),
              (this._nextAnimationId = 0),
              (this._renderer = n.createRenderer(r.body, {
                id: "0",
                encapsulation: St.None,
                styles: [],
                data: { animation: [] },
              }));
          }
          build(n) {
            const r = this._nextAnimationId.toString();
            this._nextAnimationId++;
            const i = Array.isArray(n) ? gb(n) : n;
            return (
              Gb(this._renderer, null, r, "register", [i]),
              new FV(r, this._renderer)
            );
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(C(So), C(ye));
          });
          static #t = (this.ɵprov = T({ token: e, factory: e.ɵfac }));
        }
        return e;
      })();
      class FV extends ZB {
        constructor(t, n) {
          super(), (this._id = t), (this._renderer = n);
        }
        create(t, n) {
          return new kV(this._id, t, n || {}, this._renderer);
        }
      }
      class kV {
        constructor(t, n, r, i) {
          (this.id = t),
            (this.element = n),
            (this._renderer = i),
            (this.parentPlayer = null),
            (this._started = !1),
            (this.totalTime = 0),
            this._command("create", r);
        }
        _listen(t, n) {
          return this._renderer.listen(this.element, `@@${this.id}:${t}`, n);
        }
        _command(t, ...n) {
          return Gb(this._renderer, this.element, this.id, t, n);
        }
        onDone(t) {
          this._listen("done", t);
        }
        onStart(t) {
          this._listen("start", t);
        }
        onDestroy(t) {
          this._listen("destroy", t);
        }
        init() {
          this._command("init");
        }
        hasStarted() {
          return this._started;
        }
        play() {
          this._command("play"), (this._started = !0);
        }
        pause() {
          this._command("pause");
        }
        restart() {
          this._command("restart");
        }
        finish() {
          this._command("finish");
        }
        destroy() {
          this._command("destroy");
        }
        reset() {
          this._command("reset"), (this._started = !1);
        }
        setPosition(t) {
          this._command("setPosition", t);
        }
        getPosition() {
          return this._renderer.engine.players[+this.id]?.getPosition() ?? 0;
        }
      }
      function Gb(e, t, n, r, i) {
        return e.setProperty(t, `@@${n}:${r}`, i);
      }
      const Wb = "@.disabled";
      let LV = (() => {
        class e {
          constructor(n, r, i) {
            (this.delegate = n),
              (this.engine = r),
              (this._zone = i),
              (this._currentId = 0),
              (this._microtaskId = 1),
              (this._animationCallbacksBuffer = []),
              (this._rendererCache = new Map()),
              (this._cdRecurDepth = 0),
              (r.onRemovalComplete = (o, s) => {
                const a = s?.parentNode(o);
                a && s.removeChild(a, o);
              });
          }
          createRenderer(n, r) {
            const o = this.delegate.createRenderer(n, r);
            if (!(n && r && r.data && r.data.animation)) {
              let u = this._rendererCache.get(o);
              return (
                u ||
                  ((u = new Kb("", o, this.engine, () =>
                    this._rendererCache.delete(o)
                  )),
                  this._rendererCache.set(o, u)),
                u
              );
            }
            const s = r.id,
              a = r.id + "-" + this._currentId;
            this._currentId++, this.engine.register(a, n);
            const c = (u) => {
              Array.isArray(u)
                ? u.forEach(c)
                : this.engine.registerTrigger(s, a, n, u.name, u);
            };
            return r.data.animation.forEach(c), new jV(this, a, o, this.engine);
          }
          begin() {
            this._cdRecurDepth++, this.delegate.begin && this.delegate.begin();
          }
          _scheduleCountTask() {
            queueMicrotask(() => {
              this._microtaskId++;
            });
          }
          scheduleListenerCallback(n, r, i) {
            n >= 0 && n < this._microtaskId
              ? this._zone.run(() => r(i))
              : (0 == this._animationCallbacksBuffer.length &&
                  queueMicrotask(() => {
                    this._zone.run(() => {
                      this._animationCallbacksBuffer.forEach((o) => {
                        const [s, a] = o;
                        s(a);
                      }),
                        (this._animationCallbacksBuffer = []);
                    });
                  }),
                this._animationCallbacksBuffer.push([r, i]));
          }
          end() {
            this._cdRecurDepth--,
              0 == this._cdRecurDepth &&
                this._zone.runOutsideAngular(() => {
                  this._scheduleCountTask(),
                    this.engine.flush(this._microtaskId);
                }),
              this.delegate.end && this.delegate.end();
          }
          whenRenderingDone() {
            return this.engine.whenRenderingDone();
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(C(So), C(dl), C(te));
          });
          static #t = (this.ɵprov = T({ token: e, factory: e.ɵfac }));
        }
        return e;
      })();
      class Kb {
        constructor(t, n, r, i) {
          (this.namespaceId = t),
            (this.delegate = n),
            (this.engine = r),
            (this._onDestroy = i);
        }
        get data() {
          return this.delegate.data;
        }
        destroyNode(t) {
          this.delegate.destroyNode?.(t);
        }
        destroy() {
          this.engine.destroy(this.namespaceId, this.delegate),
            this.engine.afterFlushAnimationsDone(() => {
              queueMicrotask(() => {
                this.delegate.destroy();
              });
            }),
            this._onDestroy?.();
        }
        createElement(t, n) {
          return this.delegate.createElement(t, n);
        }
        createComment(t) {
          return this.delegate.createComment(t);
        }
        createText(t) {
          return this.delegate.createText(t);
        }
        appendChild(t, n) {
          this.delegate.appendChild(t, n),
            this.engine.onInsert(this.namespaceId, n, t, !1);
        }
        insertBefore(t, n, r, i = !0) {
          this.delegate.insertBefore(t, n, r),
            this.engine.onInsert(this.namespaceId, n, t, i);
        }
        removeChild(t, n, r) {
          this.engine.onRemove(this.namespaceId, n, this.delegate);
        }
        selectRootElement(t, n) {
          return this.delegate.selectRootElement(t, n);
        }
        parentNode(t) {
          return this.delegate.parentNode(t);
        }
        nextSibling(t) {
          return this.delegate.nextSibling(t);
        }
        setAttribute(t, n, r, i) {
          this.delegate.setAttribute(t, n, r, i);
        }
        removeAttribute(t, n, r) {
          this.delegate.removeAttribute(t, n, r);
        }
        addClass(t, n) {
          this.delegate.addClass(t, n);
        }
        removeClass(t, n) {
          this.delegate.removeClass(t, n);
        }
        setStyle(t, n, r, i) {
          this.delegate.setStyle(t, n, r, i);
        }
        removeStyle(t, n, r) {
          this.delegate.removeStyle(t, n, r);
        }
        setProperty(t, n, r) {
          "@" == n.charAt(0) && n == Wb
            ? this.disableAnimations(t, !!r)
            : this.delegate.setProperty(t, n, r);
        }
        setValue(t, n) {
          this.delegate.setValue(t, n);
        }
        listen(t, n, r) {
          return this.delegate.listen(t, n, r);
        }
        disableAnimations(t, n) {
          this.engine.disableAnimations(t, n);
        }
      }
      class jV extends Kb {
        constructor(t, n, r, i, o) {
          super(n, r, i, o), (this.factory = t), (this.namespaceId = n);
        }
        setProperty(t, n, r) {
          "@" == n.charAt(0)
            ? "." == n.charAt(1) && n == Wb
              ? this.disableAnimations(t, (r = void 0 === r || !!r))
              : this.engine.process(this.namespaceId, t, n.slice(1), r)
            : this.delegate.setProperty(t, n, r);
        }
        listen(t, n, r) {
          if ("@" == n.charAt(0)) {
            const i = (function BV(e) {
              switch (e) {
                case "body":
                  return document.body;
                case "document":
                  return document;
                case "window":
                  return window;
                default:
                  return e;
              }
            })(t);
            let o = n.slice(1),
              s = "";
            return (
              "@" != o.charAt(0) &&
                ([o, s] = (function HV(e) {
                  const t = e.indexOf(".");
                  return [e.substring(0, t), e.slice(t + 1)];
                })(o)),
              this.engine.listen(this.namespaceId, i, o, s, (a) => {
                this.factory.scheduleListenerCallback(a._data || -1, r, a);
              })
            );
          }
          return this.delegate.listen(t, n, r);
        }
      }
      const Zb = [
          { provide: pb, useClass: PV },
          {
            provide: Jh,
            useFactory: function $V() {
              return new aV();
            },
          },
          {
            provide: dl,
            useClass: (() => {
              class e extends dl {
                constructor(n, r, i, o) {
                  super(n.body, r, i);
                }
                ngOnDestroy() {
                  this.flush();
                }
                static #e = (this.ɵfac = function (r) {
                  return new (r || e)(C(ye), C($h), C(Jh), C(Dr));
                });
                static #t = (this.ɵprov = T({ token: e, factory: e.ɵfac }));
              }
              return e;
            })(),
          },
          {
            provide: So,
            useFactory: function UV(e, t, n) {
              return new LV(e, t, n);
            },
            deps: [Jf, dl, te],
          },
        ],
        sp = [
          { provide: $h, useFactory: () => new xV() },
          { provide: ly, useValue: "BrowserAnimations" },
          ...Zb,
        ],
        Qb = [
          { provide: $h, useClass: bb },
          { provide: ly, useValue: "NoopAnimations" },
          ...Zb,
        ];
      let zV = (() => {
          class e {
            static withConfig(n) {
              return { ngModule: e, providers: n.disableAnimations ? Qb : sp };
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵmod = dt({ type: e }));
            static #n = (this.ɵinj = tt({ providers: sp, imports: [dC] }));
          }
          return e;
        })(),
        qV = (() => {
          class e {
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵmod = dt({ type: e }));
            static #n = (this.ɵinj = tt({ imports: [qf] }));
          }
          return e;
        })(),
        GV = (() => {
          class e {
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵmod = dt({ type: e, bootstrap: [WB] }));
            static #n = (this.ɵinj = tt({ imports: [dC, zV, Tw, KB, qV] }));
          }
          return e;
        })();
      I1()
        .bootstrapModule(GV)
        .catch((e) => console.error(e));
    },
  },
  (re) => {
    re((re.s = 601));
  },
]);
