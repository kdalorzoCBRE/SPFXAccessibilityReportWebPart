import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as axe from 'axe-core';

export interface ISpfxTestWebPartProps {
}

export default class SpfxTestWebPart extends BaseClientSideWebPart<ISpfxTestWebPartProps> {
  public async render(): Promise<any> {
    axe
      .run()
      .then(async results => {
        if (results.violations.length) {
          this.domElement.innerHTML = ` 
        <section> 
          ${JSON.stringify(results.violations)}
        </section>`;
        }
      })
      .catch(err => {
        console.log(err.message);
        this.domElement.innerHTML = ` 
        <section> 
        Something bad happened: ${err.message}
        </section>`;
      });
  }

  protected onInit(): Promise<void> {
    return super.onInit();
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
}
