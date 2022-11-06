declare global {
  const BSLight : {
    readonly ModalShow: (e:HTMLElement,closeCB?:()=>void,showCB?:()=>void)=>void
    readonly ModalHide: (result?:string,hideCB?:()=>void)=>void,
    readonly Dropdown: (trigger:HTMLElement)=>void;
    readonly Tab: (trigger:HTMLElement,contentQS:string)=>void;
    readonly AlterDismiss:(trigger:HTMLElement)=>void;
    readonly Carousel:(carousel:HTMLElement)=>void;
  }
}

export {}