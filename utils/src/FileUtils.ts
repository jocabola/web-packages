/*
 * File Utils
 * 
 */

export const downloadFile = (cnt:ArrayBuffer|string, filename:string) => {
	const link = document.createElement( 'a' );
	link.style.display = 'none';
	document.body.appendChild( link );

	const binary = typeof cnt != "string";
	const blob = binary ? new Blob([cnt]) : new Blob([cnt], { type: 'text/plain' });

	link.href = URL.createObjectURL( blob );
	link.download = filename;
	link.click();

	document.body.removeChild(link);
}

export const addFileDropHandler = (el:HTMLElement, dropHandler:Function, overHandler?:Function, leaveHandler?:Function) => {
	el.addEventListener("dragover", (ev:DragEvent) => {
		ev.preventDefault();
		if(overHandler !== undefined) overHandler(ev);
	});
	el.addEventListener("dragleave", (ev:DragEvent) => {
		ev.preventDefault();
		if(leaveHandler !== undefined) leaveHandler(ev);
	});
	el.addEventListener("drop", (ev:DragEvent) => {
		ev.preventDefault();
		if (ev.dataTransfer != null && ev.dataTransfer.items) {
			const files = [];
			// Use DataTransferItemList interface to access the file(s)
			for (var i = 0; i < ev.dataTransfer.items.length; i++) {
				// If dropped items aren't files, reject them
				if (ev.dataTransfer.items[i].kind === 'file') {
					var file = ev.dataTransfer.items[i].getAsFile();
					files.push(file);
				}
			}
			dropHandler(files);
		} else {
			// Use DataTransfer interface to access the file(s)
			dropHandler(ev.dataTransfer != null && ev.dataTransfer.files);
		}
	});
}