import{_ as e,o,c as d,R as c}from"./chunks/framework.5CQsgBHo.js";const i=""+new URL("16.j6ijCpzg.webp",import.meta.url).href,u=JSON.parse('{"title":"browser","description":"","frontmatter":{},"headers":[],"relativePath":"browser.md","filePath":"browser.md"}'),a={name:"browser.md"},s=c('<h1 id="browser" tabindex="-1">browser <a class="header-anchor" href="#browser" aria-label="Permalink to &quot;browser&quot;">​</a></h1><h2 id="_1-跨域问题" tabindex="-1">1. 跨域问题 <a class="header-anchor" href="#_1-跨域问题" aria-label="Permalink to &quot;1. 跨域问题&quot;">​</a></h2><p>由于浏览器<code>同源策略</code>（浏览器安全功能，它会阻止一个域与另一个域的内容进行交互，能<code>有效防止XSS、CSRF攻击</code>）的限制，非同源的请求会被限制。</p><p>解决跨域问题的方法：</p><ul><li>配置nginx反向代理 跨域解决：location配置中，在响应头上添加允许访问的请求源 Access-Control-Allow-Origin:*</li><li>使用jsonp方式（script方式） 利用srcipt标签的src属性来实现，前端声明好一个函数，后端返回执行函数，执行函数参数中携带所需的数据。 可以使用jquery的ajax快速实现Jsonp。 使用jsonp只能解决get请求的跨域，因为script标签中的src请求就是get请求。</li><li>使用图片</li><li>设置CORS（跨域资源共享） 在配置类中，添加一个CORS的过滤器，在响应头上添加允许访问的请求源 addAllowedOrigin(&quot;*&quot;)</li><li>利用iframe实现</li><li>WebSocket</li></ul><h2 id="_2-浏览器的存储有哪些及它们间的区别" tabindex="-1">2. 浏览器的存储有哪些及它们间的区别 <a class="header-anchor" href="#_2-浏览器的存储有哪些及它们间的区别" aria-label="Permalink to &quot;2. 浏览器的存储有哪些及它们间的区别&quot;">​</a></h2><ul><li>cookie</li><li>session storage</li><li>local storage</li><li>indexedDB:用于客户端存储大量的结构化数据（文件/二进制大型对象（blobs））。该API使用索引实现对数据的高性能搜索。</li><li>cache storage：用于对Cache对象的存储。</li></ul><h2 id="_3-说说浏览器渲染页面的过程" tabindex="-1">3. 说说浏览器渲染页面的过程 <a class="header-anchor" href="#_3-说说浏览器渲染页面的过程" aria-label="Permalink to &quot;3. 说说浏览器渲染页面的过程&quot;">​</a></h2><p>首先输入一个网址，浏览器会向服务器发起<code>DNS请求</code>，得到对应的<code>IP地址</code>（会被缓存一段时间，后续访问就不用再去向服务器查询）。之后会进行<code>TCP三次握手</code>与服务器建立连接，连接建立后，浏览器会代表用户<code>发送一个初始的GET请求</code>，通常是请求一个<code>HTML文件</code>。服务器收到对应请求后 ，会根据<code>相关的响应头和HTML内容进行回复</code>。</p><p>一旦浏览器拿到了数据，就会开始<code>解析信息</code>，这个过程中，浏览器会根据<code>HTML文件去构建DOM树</code>，当遇到一些<code>阻塞资源</code>时（如同步加载的script标签）会去<code>加载阻塞资源而停止当前DOM树构建</code>（所以能够异步的或延迟加载的就尽量异步或延迟，同时页面的脚本还是越少越好）。在构建DOM树时，浏览器的主线程被占据着，不过浏览器的<code>预加载扫描器会去请求高优先级的资源（如css、js、字体）</code>，预加载扫描器很好的优化了阻塞问题。接下来浏览器会处理<code>CSS生成CSSDOM树</code>，将CSS规则转换为可以理解和使用的<code>样式映射</code>，这个过程非常快（通常小于一次DNS查询所需时间）。有了<code>DOM树和CSSDOM</code>树，浏览器会将其组合生成一个<code>Render树</code>，<code>计算样式或渲染树会从DOM的根节点开始构建</code>，遍历每一个可见节点（将相关样式匹配到每一个可见节点，并根据CSS级联去的每个节点的计算样式）。接下来开始<code>布局</code>，该过程（依旧是从根节点开始）会确定所有节点的<code>宽高和位置</code>，最后通过渲染器将其在页面上<code>绘制</code>。绘制完成了，并不代表交互也都生效了，因为主线程可能还无法抽出时间去处理滚动、触摸等交互，要等到js加载完成，同时主线程空闲了整个页面才是正常可用的状态。</p><p><img src="'+i+`" alt="tupian"></p><h2 id="_4-说下线程和进程" tabindex="-1">4. 说下线程和进程 <a class="header-anchor" href="#_4-说下线程和进程" aria-label="Permalink to &quot;4. 说下线程和进程&quot;">​</a></h2><p><code>进程</code>：一个在内存中运行的应用程序。每个进程都有自己独立的一块内存空间，一个进程可以有多个线程，比如在Windows系统中，一个运行的xx.exe就是一个进程。 <code>线程</code>：进程中的一个执行任务（控制单元），负责当前进程中程序的执行。一个进程至少有一个线程，一个进程可以运行多个线程，多个线程可共享数据。 <code>与进程不同的是</code>同类的多个线程共享进程的堆和方法区资源，但每个线程有自己的程序计数器、虚拟机栈和本地方法栈，所以系统在产生一个线程，或是在各个线程之间作切换工作时，负担要比进程小得多，也正因为如此，线程也被称为轻量级进程。</p><h2 id="_5-说下堆和栈" tabindex="-1">5. 说下堆和栈 <a class="header-anchor" href="#_5-说下堆和栈" aria-label="Permalink to &quot;5. 说下堆和栈&quot;">​</a></h2><ul><li>栈区（stack）— 由编译器自动分配释放 ，存放函数的参数值，局部变量的值等。其 操作方式类似于数据结构中的栈。</li><li>堆区（heap） — 一般由程序员分配释放， 若程序员不释放，程序结束时可能由OS回 收 。注意它与数据结构中的堆是两回事，分配方式倒是类似于链表，呵呵。</li></ul><h2 id="_6-http和https的区别" tabindex="-1">6. http和https的区别 <a class="header-anchor" href="#_6-http和https的区别" aria-label="Permalink to &quot;6. http和https的区别&quot;">​</a></h2><p><code>HTTP（Hypertext Transfer Protocol</code>）和<code>HTTPS（Hypertext Transfer Protocol Secure）</code>是用于在<code>客户端和服务器之间传输数据的协议</code>。它们之间的主要区别在于<code>安全性和数据传输方式</code>：</p><ul><li><code>安全性</code>：<code>HTTP是明文</code>传输协议，数据在传输过程中不加密，因此容易被恶意攻击者截取和篡改。而<code>HTTPS通过使用SSL</code>（Secure Sockets Layer）或<code>TLS</code>（Transport Layer Security）协议<code>对数据进行加密和身份验证</code>，确保数据在传输过程中的安全性。</li><li><code>数据传输方式</code>：<code>HTTP</code>使用的默认端口是<code>80</code>，而<code>HTTPS</code>使用的默认端口是<code>443</code>。<code>HTTP</code>的数据传输是<code>明文</code>的，而<code>HTTPS</code>的数据传输是<code>加密</code>的</li><li><code>证书</code>：为了使用<code>HTTPS</code>，服务器需要获得一个<code>数字证书</code>，该证书由权威机构颁发，用于验证服务器的身份和加密通信。而HTTP不需要使用证书。 总结来说，<code>HTTPS比HTTP更安全，因为它通过加密数据传输来保护用户的隐私和安全。在处理敏感信息（例如登录凭证、支付信息等）时，建议使用HTTPS来确保数据的安全传输。</code></li></ul><h2 id="_7-get和post的区别" tabindex="-1">7. get和post的区别 <a class="header-anchor" href="#_7-get和post的区别" aria-label="Permalink to &quot;7. get和post的区别&quot;">​</a></h2><p>get和post是HTTP协议中常用的两种请求方法，它们之间的主要区别如下：</p><ol><li><code>数据传输方式</code>： <ul><li>GET：通过<code>URL参数传递数据</code>，数据会附加在URL的末尾，以键值对的形式出现，例如：<code>example.com?name=John&amp;age=25 </code>,GET请求通常<code>用于获取数据</code>，对<code>服务器的数据不会产生影响</code>。</li><li>POST: 通过<code>请求体传递数据</code>，数据不会附加在URL上，而是作为请求的一部分发送。POST请求通常<code>用于提交数据</code>，对<code>服务器的数据进行修改添加</code>。</li></ul></li><li><code>数据传输安全</code><ul><li>GET：数据以<code>明文形式出现在URL</code>上，因此在传输过程中<code>不够安全</code>。<code>适用于非敏感数据</code>。</li><li>POST：数据通过<code>请求体传输</code>，不会直接暴露在URL上，相对<code>更安全</code>。<code>适用于敏感数据</code>。</li></ul></li><li><code>数据长度限制</code><ul><li><code>GET</code>：由于数据附加在URL上，<code>URL的长度受限制</code>，不适合传输大量数据。</li><li><code>POST</code>：由于数据在请求体中传输，<code>没有URL长度限制</code>，适合传输大量数据。</li></ul></li><li><code>缓存</code><ul><li><code>GET：请求会被浏览器缓存</code>，可以通过浏览器的后<code>退按钮重新加载页面</code>。</li><li><code>POST：请求不会被浏览器缓存</code>，重新加载页面时会重新发送请求。</li></ul></li><li><code>安全性</code><ul><li>GET：由于<code>数据暴露在URL</code>上，<code>容易被恶意攻击者截取和篡改</code>。</li><li>POST：相对于GET请求，POST请求的数据传输更加安全，因为数据不会直接暴露在URL上。</li></ul></li></ol><p>综上所述，<code>GET适合用于获取数据，POST适合用于提交数据</code>，根据具体的需求和数据的安全性要求选择合适的请求方法。</p><h2 id="_8-css加载会造成阻塞吗" tabindex="-1">8. css加载会造成阻塞吗 <a class="header-anchor" href="#_8-css加载会造成阻塞吗" aria-label="Permalink to &quot;8. css加载会造成阻塞吗&quot;">​</a></h2><p>CSS加载会造成浏览器的渲染阻塞。这是因为:</p><ol><li>浏览器在解析HTML文档时,会遇到link标签加载外部CSS文件,此时浏览器会暂停HTML解析,直到CSS文件加载完成。</li><li>浏览器需要构建DOM树和CSSOM,并将两者合并成渲染树,才能开始页面渲染。如果CSS文件没有加载完成,浏览器无法构建渲染树,因此无法渲染页面。</li><li>CSS的加载和解析是同步的,浏览器需要等待CSS文件完全加载和解析完成后才会继续渲染页面。</li></ol><p>以上三个原因会造成CSS加载对浏览器的渲染产生阻塞效应。</p><p>为了避免这种阻塞,我们可以采取以下措施:</p><ul><li>将CSS代码<code>内联</code>在HTML文档中,而不是使用外部CSS文件。这可以避免浏览器暂停HTML解析等待CSS文件加载的阻塞。</li><li>使用<code>media</code>属性为CSS文件指定media类型,使其只在<code>特定媒体加载</code>。例如:</li></ul><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">link</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> rel</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;stylesheet&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> media</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;print&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> href</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;print.css&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><ul><li>使用<code>CSS预加载</code>技术<code>preload</code>,提前加载CSS文件,避免其加载阻塞页面渲染。例如:</li></ul><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">link</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> rel</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;preload&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> href</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;style.css&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> as</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;style&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">link</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> rel</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;stylesheet&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> href</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;style.css&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><ul><li>使用<code>CSS异步加载库</code>,如loadCSS,可以异步加载CSS文件,避免其加载造成的阻塞。</li><li>将CSS代码拆分成多个文件,并采用上述方法加载,可以减少单个CSS文件对渲染的阻塞时间。</li></ul><p>综上,CSS的加载会对浏览器的渲染产生一定的阻塞效应,我们可以通过各种方法来优化,减少这种阻塞。</p><h2 id="_9-说下tcp和http" tabindex="-1">9. 说下tcp和http <a class="header-anchor" href="#_9-说下tcp和http" aria-label="Permalink to &quot;9. 说下tcp和http&quot;">​</a></h2><p><code>TCP（传输控制协议）</code>和<code>HTTP（超文本传输协议）</code>是计算机网络中的两个重要协议。</p><p><code>TCP是一种可靠的传输协议</code>，用于在网络上可靠地传输数据。它提供了面向连接的通信方式，确保数据的可靠性和顺序性。</p><p>TCP使用<code>三次握手</code>建立连接，然后通过<code>序列号和确认应答</code>来保证数据的<code>可靠传输</code>。它还具备<code>流量控制</code>和<code>拥塞控制</code>的机制，以确保网络的稳定性和公平性。</p><p><code>HTTP是一种应用层协议</code>，用于在<code>Web上传输超文本文档</code>。它是<code>基于客户端-服务器模型</code>的协议，客户端发送HTTP请求，服务器返回HTTP响应。<code>HTTP使用URL（统一资源定位符）来定位资源</code>，并使用不同的方法（如GET、POST、PUT、DELETE等）来对资源进行操作。它还支持<code>状态管理</code>和<code>会话管理</code>等功能，使得Web应用能够实现用户认证、数据交互等操作。</p><p>TCP和HTTP之间的关系是，<code>HTTP是建立在TCP协议之上的</code>。在进行HTTP通信时，首先需要建立TCP连接，然后在该连接上发送HTTP请求和接收HTTP响应。</p><p>总结一下，<code>TCP是一种传输协议</code>，<code>用于可靠地传输数据</code>，而<code>HTTP是一种应用层协议</code>，<code>用于在Web上传输超文本文档</code>。它们在计算机网络中扮演着不同的角色，但在Web通信中密切配合，确保数据的可靠传输和资源的访问。</p><h2 id="_10-dns缓存" tabindex="-1">10. dns缓存 <a class="header-anchor" href="#_10-dns缓存" aria-label="Permalink to &quot;10. dns缓存&quot;">​</a></h2><p>当我们<code>第一次访问</code>某个网站时，<code>DNS在返回对应的IP地址后</code>，系统会将这个记录<code>临时存储</code>下来，并为其<code>设定一个有效期限（TTL）</code>，在<code>有效期限内再次访问</code>该网站，系统会<code>直接将该结果返回</code>，而<code>无需求助DNS系统进行全球查询</code>。这个临时储存下来的记录就是<code>DNS缓存</code>。如果超过DNS缓存的有效期限再次对该网站，系统会自动再次询问DNS服务器以获得最新的结果。</p><h3 id="dns缓存有什么作用" tabindex="-1">DNS缓存有什么作用？ <a class="header-anchor" href="#dns缓存有什么作用" aria-label="Permalink to &quot;DNS缓存有什么作用？&quot;">​</a></h3><p><code>DNS域名解析采用的是UDP协议通讯</code>，受外部网络环境的影响较大，尤其是在<code>有丢包的情况下会产生较高的时延</code>，严重影响用户上网体验，而DNS缓存机制就是在这种背景下产生的。</p><p>DNS缓存可以在<code>用户发起请求</code>时，直接<code>将记录结果返回</code>，<code>不需要委托递归服务器进行全球查询</code>，这样就极大提升了DNS域名解析效率，减小了多次查询所带来的时延问题。此外，由于不必每次都请求权威解析服务器进行查询，所以缓存机制还能大幅节省权威服务器的性能消耗，减轻权威服务器的请求压力。</p><h3 id="dns缓存的缺点" tabindex="-1">DNS缓存的缺点 <a class="header-anchor" href="#dns缓存的缺点" aria-label="Permalink to &quot;DNS缓存的缺点&quot;">​</a></h3><p>DNS缓存虽然能够在一定程度上<code>提升域名解析的速度</code>，但同样也存在一些弊端，如DNS缓存需要<code>消耗一定的系统资源</code>，增加了域名系统的复杂性。此外<code>TTL值的设置对于平衡DNS解析速度和精度产生了较大影响</code>。如果<code>TTL值较短</code>，能够在<code>较短时间内刷新最新解析</code>记录，但会对<code>解析服务器造成较大压力</code>；如果<code>TTL过大</code>，则可能<code>导致地址变更</code>时，用户<code>无法及时获得最新记录</code>，从而<code>导致站点不可达或者访问到错误网站</code>，影响正常业务开展，并增加DNS被劫持的风险。</p><h2 id="_11-说下浏览器的垃圾回收" tabindex="-1">11. 说下浏览器的垃圾回收 <a class="header-anchor" href="#_11-说下浏览器的垃圾回收" aria-label="Permalink to &quot;11. 说下浏览器的垃圾回收&quot;">​</a></h2><p>浏览器的<code>垃圾回收（Garbage Collection）</code>是指浏览器<code>自动管理</code>和<code>回收JavaScript</code>代码中<code>不再使用的内存空间</code>的过程。由于JavaScript是一种高级动态语言，开发者无需手动分配和释放内存，因此浏览器的垃圾回收机制非常重要。</p><p>浏览器的垃圾回收器主要负责以下几个方面：</p><ul><li><code>标记清除（Mark and Sweep）</code>：这是最常见的垃圾回收算法。垃圾回收器会周期性地<code>遍历</code>所有的对象，并<code>标记出活动对象和不活动对象</code>。然后，它会清除那些没有被标记的不活动对象，释放它们占用的内存空间。</li><li><code>引用计数（Reference Counting）</code>：这是另一种常见的垃圾回收算法。垃圾回收器会为<code>每个对象维护一个引用计数器</code>，当对象被引用时计数器加一，当引用失效时计数器减一。当计数器为零时，垃圾回收器会清除该对象。然而，引用计数算法无法处理循环引用的情况，因此现代浏览器很少使用该算法。</li><li><code>分代回收（Generational Collection）</code>：这是一种优化的垃圾回收策略。根据<code>对象的生命周期将内存分为不同的代</code>（generation），并为每个代应用不同的回收策略。通常，新创建的对象会被分配到第一代，而经过多次垃圾回收仍然存活的对象则会被提升到下一代。这种策略可以提高垃圾回收的效率。</li></ul><p>浏览器的<code>垃圾回收器通常在空闲时执行垃圾回收操作</code>，以避免影响页面的性能。然而，垃圾回收的执行时间仍然会对页面的响应性产生一定的影响。因此，开发者应该<code>尽量避免创建大量临时对象，减少内存占用</code>，优化代码结构，以提高浏览器的性能和响应速度。</p><h2 id="_12-什么是内存泄露" tabindex="-1">12. 什么是内存泄露 <a class="header-anchor" href="#_12-什么是内存泄露" aria-label="Permalink to &quot;12. 什么是内存泄露&quot;">​</a></h2><p>在前端开发中，<code>内存泄露指的是在网页或应用程序中，分配的内存空间没有被正确释放或回收，导致这部分内存无法再被程序使用</code>，从而造成内存资源的浪费。</p><p>在前端中，内存泄露通常发生在使用JavaScript等脚本语言编写的网页或应用程序中。以下是一些常见的导致内存泄露的情况：</p><ul><li><code>未正确释放事件监听器</code>：如果在网页中添加了事件监听器（如点击事件、滚动事件等），但在元素被移除或页面卸载时没有正确移除这些监听器，就会导致内存泄露。</li><li><code>引用计数错误</code>：在JavaScript中，对象的引用计数是用来决定何时释放对象内存的一种机制。如果存在循环引用，即两个或多个对象相互引用，但没有其他地方引用它们，那么这些对象的内存就无法被垃圾回收机制释放，从而导致内存泄露。</li><li><code>定时器未清理</code>：在使用定时器（如 setTimeout 、 setInterval ）时，如果没有正确清理定时器，即使页面或应用程序关闭，定时器仍然会持续运行，导致内存泄露。</li><li><code>全局变量未释放</code>：如果在全局作用域中定义了变量或对象，并且这些变量或对象没有被及时清除或释放，就会导致内存泄露。</li></ul><p>内存泄露会导致网页或应用程序<code>占用过多的内存资源</code>，从而影响性能和用户体验。为了避免内存泄露，开发者应该注意及时释放不再使用的资源、<code>正确管理事件监听器、避免循环引用等。</code>同时，使用浏览器的<code>开发者工具和内存分析工具</code>可以帮助检测和解决内存泄露问题。</p>`,57),l=[s];function t(h,p,r,n,k,S){return o(),d("div",null,l)}const E=e(a,[["render",t]]);export{u as __pageData,E as default};
