/**
* name 
*/
module riggerLayaSync {
	export class SyncLoaderManager extends riggerIOC.WaitableTask<Laya.LoaderManager>{
		constructor() {
			super(Laya.loader);
		}

		static createMap: any;
		/** 加载出错后的重试次数，默认重试一次*/
		retryNum: number;
		/** 延迟时间多久再进行错误重试，默认立即重试*/
		retryDelay: number;
		/** 最大下载线程，默认为5个*/
		maxLoader: number;
        /**
         * <p>根据clas类型创建一个未初始化资源的对象，随后进行异步加载，资源加载完成后，初始化对象的资源，并通过此对象派发 Event.LOADED 事件，事件回调参数值为此对象本身。套嵌资源的子资源会保留资源路径"?"后的部分。</p>
         * <p>如果url为数组，返回true；否则返回指定的资源类对象，可以通过侦听此对象的 Event.LOADED 事件来判断资源是否已经加载完毕。</p>
         * <p><b>注意：</b>cache参数只能对文件后缀为atlas的资源进行缓存控制，其他资源会忽略缓存，强制重新加载。</p>
         * @param	url			资源地址或者数组。如果url和clas同时指定了资源类型，优先使用url指定的资源类型。参数形如：[
         * @param	complete	加载结束回调。根据url类型不同分为2种情况：1. url为String类型，也就是单个资源地址，如果加载成功，则回调参数值为加载完成的资源，否则为null；2. url为数组类型，指定了一组要加载的资源，如果全部加载成功，则回调参数值为true，否则为false。
         * @param	progress	资源加载进度回调，回调参数值为当前资源加载的进度信息(0-1)。
         * @param	clas		资源类名。如果url和clas同时指定了资源类型，优先使用url指定的资源类型。参数形如：Texture。
         * @param	params		资源构造参数。
         * @param	priority	(default = 1)加载的优先级，优先级高的优先加载。有0-4共5个优先级，0最高，4最低。
         * @param	cache		是否缓存加载的资源。
         * @return	如果url为数组，返回true；否则返回指定的资源类对象。
         */
		create(url: any, complete?: Laya.Handler, progress?: Laya.Handler, clas?: any, params?: Array<any>, priority?: number, cache?: boolean): Promise<any> {
			this.onCompleteHandler = complete;
			this.content.create(url, Laya.Handler.create(this, this.onComplete, [url]), progress, clas, params, priority, cache)
		}

        /**
         * <p>加载资源。资源加载错误时，本对象会派发 Event.ERROR 事件，事件回调参数值为加载出错的资源地址。</p>
         * <p>因为返回值为 LoaderManager 对象本身，所以可以使用如下语法：Laya.loader.load(...).load(...);</p>
         * @param	url			要加载的单个资源地址或资源信息数组。比如：简单数组：["a.png","b.png"]；复杂数组[
         * @param	complete	加载结束回调。根据url类型不同分为2种情况：1. url为String类型，也就是单个资源地址，如果加载成功，则回调参数值为加载完成的资源，否则为null；2. url为数组类型，指定了一组要加载的资源，如果全部加载成功，则回调参数值为true，否则为false。
         * @param	progress	加载进度回调。回调参数值为当前资源的加载进度信息(0-1)。
         * @param	type		资源类型。比如：Loader.IMAGE。
         * @param	priority	(default = 1)加载的优先级，优先级高的优先加载。有0-4共5个优先级，0最高，4最低。
         * @param	cache		是否缓存加载结果。
         * @param	group		分组，方便对资源进行管理。
         * @param	ignoreCache	是否忽略缓存，强制重新加载。
         * @return 此 LoaderManager 对象本身。
         */
		load(url: any, complete?: Handler, progress?: Handler, type?: string, priority?: number, cache?: boolean, group?: string, ignoreCache?: boolean): LoaderManager;
		
        /**
         * 清理指定资源地址缓存。
         * @param	url 资源地址。
         * @param	forceDispose 是否强制销毁，有些资源是采用引用计数方式销毁，如果forceDispose=true，则忽略引用计数，直接销毁，比如Texture，默认为false
         */
		clearRes(url: string, forceDispose?: boolean): void;
        /**
         * 获取指定资源地址的资源。
         * @param	url 资源地址。
         * @return	返回资源。
         */
		getRes(url: string): any;
        /**
         * 缓存资源。
         * @param	url 资源地址。
         * @param	data 要缓存的内容。
         */
		cacheRes(url: string, data: any): void;
        /**
         * 销毁Texture使用的图片资源，保留texture壳，如果下次渲染的时候，发现texture使用的图片资源不存在，则会自动恢复
         * 相比clearRes，clearTextureRes只是清理texture里面使用的图片资源，并不销毁texture，再次使用到的时候会自动恢复图片资源
         * 而clearRes会彻底销毁texture，导致不能再使用；clearTextureRes能确保立即销毁图片资源，并且不用担心销毁错误，clearRes则采用引用计数方式销毁
         * 【注意】如果图片本身在自动合集里面（默认图片小于512*512），内存是不能被销毁的，此图片被大图合集管理器管理
         * @param	url	图集地址或者texture地址，比如 Loader.clearTextureRes("res/atlas/comp.atlas"); Loader.clearTextureRes("hall/bg.jpg");
         */
		clearTextureRes(url: string): void;
        /**
         * 设置资源分组。
         * @param url 资源地址。
         * @param group 分组名
         */
		setGroup(url: string, group: string): void;
        /**
         * 根据分组清理资源。
         * @param group 分组名
         */
		clearResByGroup(group: string): void;
        /**
         * @private
         * 缓存资源。
         * @param	url 资源地址。
         * @param	data 要缓存的内容。
         */
		static cacheRes(url: string, data: any): void;
		/** 清理当前未完成的加载，所有未加载的内容全部停止加载。*/
		clearUnLoaded(): void;
        /**
         * 根据地址集合清理掉未加载的内容
         * @param	urls 资源地址集合
         */
		cancelLoadByUrls(urls: Array<any>): void;
        /**
         * 根据地址清理掉未加载的内容
         * @param	url 资源地址
         */
		cancelLoadByUrl(url: string): void{

		}

		private onCompleteHandler: Laya.Handler;
		protected onComplete(assetsName: string){
			this.done(this.getRes(assetsName));
			this.onCompleteHandler && this.onCompleteHandler.run();
		}
	}
}