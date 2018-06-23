import { ToastController } from "ionic-angular/components/toast/toast-controller";
export class Toast {

    constructor(public toastCtrl: ToastController) 
    {
    }
    showToast(message,duration = 3000, position = 'bottom', cssClass = 'dark-trans', closeButtonText = 'OK',
    showCloseButton = true ) 
    {
        let toast = this.toastCtrl.create({
            message: message,
            duration: duration,
            position: position,
            cssClass: cssClass,
            closeButtonText: closeButtonText,
            showCloseButton: showCloseButton
          });
          toast.present();
    }
}