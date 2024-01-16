
/*!
 * fireworks-js 1.4.0 by Vitalij Ryndin (https://crashmax.ru)
 * https://fireworks.js.org
 * License MIT
 */
!(function (t, i) {
    if ("object" == typeof exports && "object" == typeof module) module.exports = i();
    else if ("function" == typeof define && define.amd) define([], i);
    else {
        var s = i();
        for (var e in s) ("object" == typeof exports ? exports : t)[e] = s[e];
    }
})(this, function () {
    return (() => {
        "use strict";
        var t = {
                511: (t, i, s) => {
                    Object.defineProperty(i, "__esModule", { value: !0 }), (i.Explosion = void 0);
                    var e = s(909);
                    i.Explosion = class {
                        constructor(t) {
                            var { x: i, y: s, ctx: n, hue: h, gravity: o, friction: a, brightness: r, flickering: c, lineWidth: _, explosionLength: d } = t;
                            for (
                                this._coordinates = [], this._alpha = 1, this._x = i, this._y = s, this._ctx = n, this._gravity = o, this._friction = a, this._flickering = c, this._lineWidth = _, this._explosionLength = d;
                                this._explosionLength--;

                            )
                                this._coordinates.push([i, s]);
                            (this._angle = (0, e.randomFloat)(0, 2 * Math.PI)),
                                (this._speed = (0, e.randomInt)(1, 10)),
                                (this._hue = (0, e.randomInt)(h - 20, h + 20)),
                                (this._brightness = (0, e.randomInt)(r.min, r.max)),
                                (this._decay = (0, e.randomFloat)(r.decay.min, r.decay.max));
                        }
                        update(t) {
                            this._coordinates.pop(),
                                this._coordinates.unshift([this._x, this._y]),
                                (this._speed *= this._friction),
                                (this._x += Math.cos(this._angle) * this._speed),
                                (this._y += Math.sin(this._angle) * this._speed + this._gravity),
                                (this._alpha -= this._decay),
                                this._alpha <= this._decay && t();
                        }
                        draw() {
                            var t = this._coordinates.length - 1;
                            this._ctx.beginPath(),
                                (this._ctx.lineWidth = this._lineWidth),
                                (this._ctx.fillStyle = (0, e.hsla)(this._hue, this._brightness, this._alpha)),
                                this._ctx.moveTo(this._coordinates[t][0], this._coordinates[t][1]),
                                this._ctx.lineTo(this._x, this._y),
                                (this._ctx.strokeStyle = (0, e.hsla)(this._hue, this._flickering ? (0, e.randomFloat)(0, this._brightness) : this._brightness, this._alpha)),
                                this._ctx.stroke();
                        }
                    };
                },
                909: (t, i) => {
                    Object.defineProperty(i, "__esModule", { value: !0 }),
                        (i.hsla = i.getDistance = i.randomInt = i.randomFloat = void 0),
                        (i.randomFloat = function (t, i) {
                            return Math.random() * (i - t) + t;
                        }),
                        (i.randomInt = function (t, i) {
                            return Math.floor(t + Math.random() * (i + 1 - t));
                        }),
                        (i.getDistance = function (t, i, s, e) {
                            var n = Math.pow;
                            return Math.sqrt(n(t - s, 2) + n(i - e, 2));
                        }),
                        (i.hsla = function (t, i) {
                            var s = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1;
                            return "hsla(".concat(t, ", 100%, ").concat(i, "%, ").concat(s, ")");
                        });
                },
                449: function (t, i, s) {
                    var e =
                        (this && this.__awaiter) ||
                        function (t, i, s, e) {
                            return new (s || (s = Promise))(function (n, h) {
                                function o(t) {
                                    try {
                                        r(e.next(t));
                                    } catch (t) {
                                        h(t);
                                    }
                                }
                                function a(t) {
                                    try {
                                        r(e.throw(t));
                                    } catch (t) {
                                        h(t);
                                    }
                                }
                                function r(t) {
                                    var i;
                                    t.done
                                        ? n(t.value)
                                        : ((i = t.value),
                                          i instanceof s
                                              ? i
                                              : new s(function (t) {
                                                    t(i);
                                                })).then(o, a);
                                }
                                r((e = e.apply(t, i || [])).next());
                            });
                        };
                    Object.defineProperty(i, "__esModule", { value: !0 }), (i.Sound = void 0);
                    var n = s(909);
                    i.Sound = class {
                        constructor(t) {
                            (this._buffer = []), (this.onInit = !0), (this.options = Object.assign({ enabled: !1, files: ["explosion0.mp3", "payouts.html", "explosion2.mp3"], volume: { min: 4, max: 8 } }, t)), this.init();
                        }
                        init() {
                            this.onInit && this.options.enabled && ((this.onInit = !1), (this._audioContext = new (window.AudioContext || window.webkitAudioContext)()), this.load());
                        }
                        load() {
                            return e(this, void 0, void 0, function* () {
                                for (var t of this.options.files) {
                                    var i = yield (yield fetch(t)).arrayBuffer();
                                    this._audioContext
                                        .decodeAudioData(i)
                                        .then((t) => {
                                            this._buffer.push(t);
                                        })
                                        .catch((t) => {
                                            throw t;
                                        });
                                }
                            });
                        }
                        play() {
                            if (this.options.enabled && this._buffer.length) {
                                var t = this._audioContext.createBufferSource(),
                                    i = this._buffer[(0, n.randomInt)(0, this._buffer.length - 1)],
                                    s = this._audioContext.createGain();
                                (t.buffer = i), (s.gain.value = (0, n.randomFloat)(this.options.volume.min / 100, this.options.volume.max / 100)), s.connect(this._audioContext.destination), t.connect(s), t.start(0);
                            } else this.init();
                        }
                    };
                },
                668: (t, i, s) => {
                    Object.defineProperty(i, "__esModule", { value: !0 }), (i.Trace = void 0);
                    var e = s(909);
                    i.Trace = class {
                        constructor(t) {
                            var { x: i, y: s, dx: n, dy: h, ctx: o, hue: a, speed: r, traceLength: c, acceleration: _ } = t;
                            for (
                                this._coordinates = [],
                                    this._currentDistance = 0,
                                    this._x = i,
                                    this._y = s,
                                    this._sx = i,
                                    this._sy = s,
                                    this._dx = n,
                                    this._dy = h,
                                    this._ctx = o,
                                    this._hue = a,
                                    this._speed = r,
                                    this._traceLength = c,
                                    this._acceleration = _,
                                    this._totalDistance = (0, e.getDistance)(i, s, n, h);
                                this._traceLength--;

                            )
                                this._coordinates.push([i, s]);
                            (this._angle = Math.atan2(h - s, n - i)), (this._brightness = (0, e.randomInt)(50, 70));
                        }
                        update(t) {
                            this._coordinates.pop(), this._coordinates.unshift([this._x, this._y]), (this._speed *= this._acceleration);
                            var i = Math.cos(this._angle) * this._speed,
                                s = Math.sin(this._angle) * this._speed;
                            (this._currentDistance = (0, e.getDistance)(this._sx, this._sy, this._x + i, this._y + s)), this._currentDistance >= this._totalDistance ? t(this._dx, this._dy, this._hue) : ((this._x += i), (this._y += s));
                        }
                        draw() {
                            var t = this._coordinates.length - 1;
                            this._ctx.beginPath(),
                                this._ctx.moveTo(this._coordinates[t][0], this._coordinates[t][1]),
                                this._ctx.lineTo(this._x, this._y),
                                (this._ctx.strokeStyle = (0, e.hsla)(this._hue, this._brightness)),
                                this._ctx.stroke();
                        }
                    };
                },
            },
            i = {};
        function s(e) {
            var n = i[e];
            if (void 0 !== n) return n.exports;
            var h = (i[e] = { exports: {} });
            return t[e].call(h.exports, h, h.exports, s), h.exports;
        }
        var e = {};
        return (
            (() => {
                var t = e;
                Object.defineProperty(t, "__esModule", { value: !0 }), (t.Fireworks = void 0);
                var i = s(668),
                    n = s(449),
                    h = s(511),
                    o = s(909);
                t.Fireworks = class {
                    constructor(t) {
						
						if(!t)
							return(false);
						
                        var {
                            autoresize: i = !0,
                            boundaries: s,
                            brightness: e,
                            delay: h,
                            hue: o,
                            mouse: a,
                            sound: r,
                            rocketsPoint: c,
                            lineWidth: _,
                            lineStyle: d = "round",
                            flickering: l = 50,
                            trace: u = 3,
                            traceSpeed: m = 10,
                            intensity: p = 30,
                            explosion: x = 5,
                            gravity: v = 1.5,
                            opacity: g = 0.5,
                            particles: f = 50,
                            friction: y = 0.95,
                            acceleration: b = 1.05,
                        } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                        (this._tick = 0),
                            (this._timestamp = performance.now()),
                            (this._version = "1.4.0"),
                            (this._running = !1),
                            (this._m = !1),
                            t instanceof HTMLCanvasElement ? ((this._container = t), (this._canvas = t)) : ((this._container = t), (this._canvas = document.createElement("canvas")), this._container.appendChild(this._canvas)),
                            (this._ctx = this._canvas.getContext("2d")),
                            (this._sound = new n.Sound(r)),
                            this.setSize(),
                            this.setBoundaries(Object.assign({ visible: !1, x: 50, y: 50 }, s)),
                            (this.autoresize = i),
                            (this.trace = u),
                            (this.explosion = x),
                            (this.gravity = v),
                            (this.opacity = g),
                            (this.particles = f),
                            (this.friction = y),
                            (this.acceleration = b),
                            (this.flickering = l),
                            (this.intensity = p),
                            (this.traceSpeed = m),
                            (this.lineStyle = d),
                            (this.hue = Object.assign({ min: 0, max: 360 }, o)),
                            (this.rocketsPoint = Object.assign({ min: 50, max: 50 }, c)),
                            (this.lineWidth = Object.assign({ explosion: { min: 1, max: 3 }, trace: { min: 1, max: 2 } }, _)),
                            (this.mouse = Object.assign({ click: !1, move: !1, max: 1 }, a)),
                            (this.delay = Object.assign({ min: 15, max: 30 }, h)),
                            (this.brightness = Object.assign({ min: 50, max: 80, decay: { min: 0.015, max: 0.03 } }, e)),
                            this.autoresize && window.addEventListener("resize", () => this.windowResize()),
                            this._canvas.addEventListener("mousedown", (t) => this.mouseDown(t)),
                            this._canvas.addEventListener("mouseup", (t) => this.mouseUp(t)),
                            this._canvas.addEventListener("mousemove", (t) => this.mouseMove(t));
                    }
                    get isRunning() {
                        return this._running;
                    }
                    get version() {
                        return this._version;
                    }
                    start() {
                        this._running || ((this._running = !0), this.clear(), this.render());
                    }
                    stop() {
                        this._running && ((this._running = !1), this.clear());
                    }
                    unmount() {
                        window.removeEventListener("resize", this.windowResize),
                            this._canvas.addEventListener("mousedown", this.mouseDown),
                            this._canvas.addEventListener("mouseup", this.mouseUp),
                            this._canvas.addEventListener("mousemove", this.mouseMove);
                    }
                    pause() {
                        (this._running = !this._running), this._running && this.render();
                    }
                    clear() {
                        this._ctx && ((this._traces = []), (this._explosions = []), this._ctx.clearRect(0, 0, this._width, this._height));
                    }
                    setOptions(t) {
                        for (var [i, s] of Object.entries(t)) {
                            var e = Object.prototype.hasOwnProperty.call(this, i);
                            if ("function" == typeof this[i]) throw new Error("You cannot change the methods of the class!");
                            e && ("object" == typeof this[i] ? Object.assign(this[i], s) : (this[i] = s)), "sound" === i && Object.assign(this._sound.options, s);
                        }
                    }
                    setSize() {
						if(!this._container)
							return(false);
                        var {
                            width: t = this._container instanceof HTMLCanvasElement ? this._canvas.width : this._container.clientWidth,
                            height: i = this._container instanceof HTMLCanvasElement ? this._canvas.height : this._container.clientHeight,
                        } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                        (this._width = t), (this._height = i), (this._canvas.width = t), (this._canvas.height = i), this.setBoundaries({ width: t, height: i });
                    }
                    setBoundaries(t) {
                        this.boundaries = Object.assign(Object.assign({}, this.boundaries), t);
                    }
                    useMouse(t, i) {
                        (this.mouse.click || this.mouse.move) && ((this._mx = t.pageX - this._canvas.offsetLeft), (this._my = t.pageY - this._canvas.offsetTop), (this._m = i));
                    }
                    windowResize() {
                        this.setSize();
                    }
                    mouseDown(t) {
                        this.useMouse(t, this.mouse.click);
                    }
                    mouseUp(t) {
                        this.useMouse(t, !1);
                    }
                    mouseMove(t) {
                        this.useMouse(t, this._m);
                    }
                    render() {
						
						if(!this._ctx){
							this.pause();
							this.stop();
							return(false);
						}
							
                        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this._timestamp;
                        if (this._ctx && this._running) {
                            requestAnimationFrame((t) => this.render(t)),
                                (this._ctx.globalCompositeOperation = "destination-out"),
                                (this._ctx.fillStyle = "rgba(0, 0, 0, ".concat(this.opacity, ")")),
                                this._ctx.fillRect(0, 0, this._width, this._height),
                                (this._ctx.globalCompositeOperation = "lighter"),
                                (this._ctx.lineCap = this.lineStyle),
                                (this._ctx.lineJoin = "round"),
                                this.drawBoundaries(),
                                this.initTrace(),
                                this.drawTrace(),
                                this.drawExplosion();
                            var i = t - this._timestamp;
                            (this._timestamp = t), (this._tick += (i * (this.intensity * Math.PI)) / 1e3);
                        }
                    }
                    drawBoundaries() {
                        this.boundaries.visible &&
                            (this._ctx.beginPath(),
                            (this._ctx.lineWidth = 1),
                            (this._ctx.strokeStyle = "red"),
                            this._ctx.rect(this.boundaries.x, this.boundaries.y, this.boundaries.width - 2 * this.boundaries.x, 0.5 * this.boundaries.height),
                            this._ctx.stroke());
                    }
                    initTrace() {
                        (this._ds = (0, o.randomInt)(this.delay.min, this.delay.max)),
                            (this._tick > this._ds || (this._m && this.mouse.max > this._traces.length)) &&
                                (this._traces.push(
                                    new i.Trace({
                                        x: (this._width * (0, o.randomInt)(this.rocketsPoint.min, this.rocketsPoint.max)) / 100,
                                        y: this._height,
                                        dx: (this._mx && this.mouse.move) || this._m ? this._mx : (0, o.randomInt)(this.boundaries.x, this.boundaries.width - 2 * this.boundaries.x),
                                        dy: (this._my && this.mouse.move) || this._m ? this._my : (0, o.randomInt)(this.boundaries.y, 0.5 * this.boundaries.height),
                                        ctx: this._ctx,
                                        hue: (0, o.randomInt)(this.hue.min, this.hue.max),
                                        speed: this.traceSpeed,
                                        acceleration: this.acceleration,
                                        traceLength: this.trace,
                                    })
                                ),
                                (this._tick = 0));
                    }
                    drawTrace() {
                        var t = this._traces.length;
                        for (this._ctx.lineWidth = (0, o.randomFloat)(this.lineWidth.trace.min, this.lineWidth.trace.max); t--; )
                            this._traces[t].draw(),
                                this._traces[t].update((i, s, e) => {
                                    this.initExplosion(i, s, e), this._sound.play(), this._traces.splice(t, 1);
                                });
                    }
                    initExplosion(t, i, s) {
                        for (var e = this.particles; e--; )
                            this._explosions.push(
                                new h.Explosion({
                                    x: t,
                                    y: i,
                                    ctx: this._ctx,
                                    hue: s,
                                    friction: this.friction,
                                    gravity: this.gravity,
                                    flickering: (0, o.randomInt)(0, 100) <= this.flickering,
                                    lineWidth: (0, o.randomFloat)(this.lineWidth.explosion.min, this.lineWidth.explosion.max),
                                    explosionLength: Math.round(this.explosion),
                                    brightness: this.brightness,
                                })
                            );
                    }
                    drawExplosion() {
                        for (var t = this._explosions.length; t--; )
                            this._explosions[t].draw(),
                                this._explosions[t].update(() => {
                                    this._explosions.splice(t, 1);
                                });
                    }
                };
            })(),
            e
        );
    })();
});
