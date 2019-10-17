import ResourceLoader from "@biotope/resource-loader/lib/index.esm";

{
	const init = () => {
		const elementsWithDataInit: HTMLElement[] = [].slice.call(document.querySelectorAll("[data-init]"));
		elementsWithDataInit.forEach((element: HTMLElement) => {
			const initFunction = eval(element.dataset.init);
			initFunction(element);
        });

		if (document.querySelector(".js-openModal")) {
			document.querySelectorAll(".js-openModal").forEach(e => {
				console.log(e);
				
				e.addEventListener("click", (e: Event) => {
					console.log('WHOT');
					e.preventDefault();

					const target: any = e.target;
					openModal(target.getAttribute("modaltype"));
					function openModal(type: string) {
						document
							.querySelector(`bio-modal[modalType = ${type}]`)
							.dispatchEvent(new CustomEvent("modal.open"));
					}
				});
			});
        }
        
        document.addEventListener("keydown", (e: KeyboardEvent) => {
            if (e.keyCode === 27) {
                [].slice.call(document.querySelectorAll("bio-modal")).forEach((modal: HTMLElement) => {
                    modal.dispatchEvent(new CustomEvent("modal.close"));
                });
            }
        });
    };

	const setupResourceLoader = () => {
		const cssHandler = {
			match: options => options.resource.path.indexOf(".css") > -1,
			handle: options => {
				const style = document.createElement("link");
				style.rel = "stylesheet";
				style.href = options.resource.path;
				document.body.appendChild(style);
			}
		};

		const jsHandler = {
			match: options => options.resource.path.indexOf(".js") > -1,
			handle: options => {
				const script = document.createElement("script");
				script.src = options.resource.path;
				script.async = true;
				document.body.appendChild(script);
			}
		};

		return new ResourceLoader({
			base: biotope.configuration.get("data.staticResourcesBase"),
			baseMap: {
				"##content": biotope.configuration.get("data.staticResourcesContentRepoBase")
			},
			handler: [cssHandler, jsHandler]
		});
	};

	window.addEventListener("resourcesReady", () => {
		init();
	});
	setupResourceLoader();
}
