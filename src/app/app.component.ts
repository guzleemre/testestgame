import { Component } from '@angular/core';

interface UnityInstance {
  SendMessage: (gameObject: string, methodName: string, message: string) => void;
  // Add other properties/methods if needed
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'moriartyangularapplication';
  myGameInstance: UnityInstance | null = null;

  ngOnInit() {
    //@ts-ignore
    createUnityInstance(document.querySelector("#unity-canvas"), {
      dataUrl: "assets/Build/webglintro2.data",
      frameworkUrl: "assets/Build/webglintro2.framework.js",
      codeUrl: "assets/Build/webglintro2.wasm",
      streamingAssetsUrl: "StreamingAssets",
      companyName: "Zoldyck",
      productName: "Moriarty",
      productVersion: "1.0"
    }).then((unityInstance: UnityInstance) => {
      this.myGameInstance = unityInstance;
    });
  }

  onButtonClick() {
    if (this.myGameInstance) {
      this.myGameInstance.SendMessage('PanelDialogues', 'HandleDialogueMessage', 'nextDialogue');
      this.myGameInstance.SendMessage('Canvas', 'HandleDialogueMessage', 'nextDialogue');
    }
  }

  onSkipclick() {
    if (this.myGameInstance) {
      this.myGameInstance.SendMessage('CanvasMain', 'SkipDialogue', 'skipThevideo');
    }
  }

  showHint() {
    const modal = document.getElementById("myModal");
    if (modal) {
        modal.style.display = "block";
    }  
  }
}

