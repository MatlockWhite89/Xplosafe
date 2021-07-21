export interface Color {
  colorName: string;
  colorHexValue: string;
}

// The different color pallets that have been stored.
export enum ColorChoices {
  assortment,
  lightBlue,
  darkBlue,
  lightGreen,
  darkGreen,
  lightPurple,
  darkPurple,
  lightRed,
  darkRed,
  lightOrange,
  darkOrange,
}
// Readily available colors to use throughout the application.
export class ColorSelectionModel {
  activeColors: Color[];
  colors: Color[];
  LblueGradient: Color[];
  DblueGradient: Color[];
  LgreenGradient: Color[];
  DgreenGradient: Color[];
  LredGradient: Color[];
  DredGradient: Color[];
  LpurpleGradient: Color[];
  DpurpleGradient: Color[];
  LorangeGradient: Color[];
  DorangeGradient: Color[];

  constructor() {
    // The generic list of easy to read assortment of colors.
    this.colors = [
      // { colorName: 'Teal', colorHexValue: '#24f4ff' }, Too Harsh
      { colorName: 'Orange', colorHexValue: '#ff5e24' },
      { colorName: 'Purple', colorHexValue: '#7d31ff' },
      { colorName: 'Pink', colorHexValue: '#ff375c' },
      { colorName: 'Purple', colorHexValue: '#7d31ff' },
      { colorName: 'Gold', colorHexValue: '#9e9e00' },
      { colorName: 'Blue', colorHexValue: '#472bff' },
      { colorName: 'LPurple', colorHexValue: '#b12bff' },
      { colorName: 'LBlue', colorHexValue: '#2bc6ff' },
      { colorName: 'Red', colorHexValue: '#ff3d2b' },
      { colorName: 'BOrange', colorHexValue: '#db6c2c' },
      { colorName: 'Maroon', colorHexValue: '#ff2b72' },
      { colorName: 'Green', colorHexValue: '#229413' },
      { colorName: 'Aqua', colorHexValue: '#139476' },
      { colorName: 'Grass', colorHexValue: '#639413' },
      { colorName: 'Grey', colorHexValue: '#7e9a9a' },
      { colorName: 'Navy', colorHexValue: '#2a6592' },
      { colorName: 'Forest', colorHexValue: '#004200' },
      { colorName: 'DGrey', colorHexValue: '#3d3d3d' },
      // { colorName: 'LGrey', colorHexValue: '#a3a3a3' }, Too faded.
      { colorName: 'BloodRed', colorHexValue: '#c20000' },
      { colorName: 'Tan', colorHexValue: '#c0955d' },
    ];
    // The generic list of Light Blue colors based on gradient.
    this.LblueGradient = [
      { colorName: '', colorHexValue: '#7575ff' },
      { colorName: '', colorHexValue: '#6b6bff' },
      { colorName: '', colorHexValue: '#6b6bff' },
      { colorName: '', colorHexValue: '#6161ff' },
      { colorName: '', colorHexValue: '#5c5cff' },
      { colorName: '', colorHexValue: '#5252ff' },
      { colorName: '', colorHexValue: '#4747ff' },
      { colorName: '', colorHexValue: '#4242ff' },
      { colorName: '', colorHexValue: '#3838ff' },
      { colorName: '', colorHexValue: '#2e2eff' },
      { colorName: '', colorHexValue: '#2929ff' },
      { colorName: '', colorHexValue: '#1f1fff' },
      { colorName: '', colorHexValue: '#1414ff' },
      { colorName: '', colorHexValue: '#0f0fff' },
      { colorName: '', colorHexValue: '#0505ff' },
    ];
    // The generic list of Dark Blue colors based on gradient.
    this.DblueGradient = [
      { colorName: '', colorHexValue: '#0000f5' },
      { colorName: '', colorHexValue: '#0000f0' },
      { colorName: '', colorHexValue: '#0000e6' },
      { colorName: '', colorHexValue: '#0000e0' },
      { colorName: '', colorHexValue: '#0000db' },
      { colorName: '', colorHexValue: '#0000d1' },
      { colorName: '', colorHexValue: '#0000cc' },
      { colorName: '', colorHexValue: '#0000c7' },
      { colorName: '', colorHexValue: '#0000bd' },
      { colorName: '', colorHexValue: '#0000b8' },
      { colorName: '', colorHexValue: '#0000b3' },
      { colorName: '', colorHexValue: '#0000a8' },
      { colorName: '', colorHexValue: '#0000a3' },
      { colorName: '', colorHexValue: '#00009e' },
      { colorName: '', colorHexValue: '#000094' },
    ];
    // The generic list of Light Green colors based on gradient.
    this.LgreenGradient = [
      { colorName: '', colorHexValue: '#00fa00' },
      { colorName: '', colorHexValue: '#00f500' },
      { colorName: '', colorHexValue: '#00eb00' },
      { colorName: '', colorHexValue: '#00e000' },
      { colorName: '', colorHexValue: '#00db00' },
      { colorName: '', colorHexValue: '#00d100' },
      { colorName: '', colorHexValue: '#00c700' },
      { colorName: '', colorHexValue: '#00c200' },
      { colorName: '', colorHexValue: '#00b800' },
      { colorName: '', colorHexValue: '#00ad00' },
      { colorName: '', colorHexValue: '#00a800' },
      { colorName: '', colorHexValue: '#009e00' },
      { colorName: '', colorHexValue: '#009400' },
      { colorName: '', colorHexValue: '#008f00' },
      { colorName: '', colorHexValue: '#008500' },
    ];
    // The generic list of Dark Green colors based on gradient.
    this.DgreenGradient = [
      { colorName: '', colorHexValue: '#007500' },
      { colorName: '', colorHexValue: '#007000' },
      { colorName: '', colorHexValue: '#006600' },
      { colorName: '', colorHexValue: '#006100' },
      { colorName: '', colorHexValue: '#005c00' },
      { colorName: '', colorHexValue: '#005200' },
      { colorName: '', colorHexValue: '#004d00' },
      { colorName: '', colorHexValue: '#004700' },
      { colorName: '', colorHexValue: '#003d00' },
      { colorName: '', colorHexValue: '#003800' },
      { colorName: '', colorHexValue: '#003300' },
      { colorName: '', colorHexValue: '#002900' },
      { colorName: '', colorHexValue: '#002400' },
      { colorName: '', colorHexValue: '#001f00' },
      { colorName: '', colorHexValue: '#001400' },
    ];
    // The generic list of Light Red colors based on gradient.
    this.LredGradient = [
      { colorName: '', colorHexValue: '#ff7a7a' },
      { colorName: '', colorHexValue: '#ff7575' },
      { colorName: '', colorHexValue: '#ff6b6b' },
      { colorName: '', colorHexValue: '#ff6161' },
      { colorName: '', colorHexValue: '#ff5c5c' },
      { colorName: '', colorHexValue: '#ff5252' },
      { colorName: '', colorHexValue: '#ff4747' },
      { colorName: '', colorHexValue: '#ff4242' },
      { colorName: '', colorHexValue: '#ff3838' },
      { colorName: '', colorHexValue: '#ff2e2e' },
      { colorName: '', colorHexValue: '#ff2929' },
      { colorName: '', colorHexValue: '#ff1f1f' },
      { colorName: '', colorHexValue: '#ff1414' },
      { colorName: '', colorHexValue: '#ff0f0f' },
      { colorName: '', colorHexValue: '#ff0505' },
    ];
    // The generic list of Dark Red colors based on gradient.
    this.DredGradient = [
      { colorName: '', colorHexValue: '#f50000' },
      { colorName: '', colorHexValue: '#f00000' },
      { colorName: '', colorHexValue: '#e60000' },
      { colorName: '', colorHexValue: '#e00000' },
      { colorName: '', colorHexValue: '#db0000' },
      { colorName: '', colorHexValue: '#d10000' },
      { colorName: '', colorHexValue: '#cc0000' },
      { colorName: '', colorHexValue: '#c70000' },
      { colorName: '', colorHexValue: '#bd0000' },
      { colorName: '', colorHexValue: '#b80000' },
      { colorName: '', colorHexValue: '#b30000' },
      { colorName: '', colorHexValue: '#a80000' },
      { colorName: '', colorHexValue: '#a30000' },
      { colorName: '', colorHexValue: '#9e0000' },
      { colorName: '', colorHexValue: '#940000' },
    ];
    // The generic list of Light Purple colors based on gradient.
    this.LpurpleGradient = [
      { colorName: '', colorHexValue: '#c67aff' },
      { colorName: '', colorHexValue: '#c375ff' },
      { colorName: '', colorHexValue: '#bf6bff' },
      { colorName: '', colorHexValue: '#ba61ff' },
      { colorName: '', colorHexValue: '#b85cff' },
      { colorName: '', colorHexValue: '#b452ff' },
      { colorName: '', colorHexValue: '#af47ff' },
      { colorName: '', colorHexValue: '#ad42ff' },
      { colorName: '', colorHexValue: '#a938ff' },
      { colorName: '', colorHexValue: '#a42eff' },
      { colorName: '', colorHexValue: '#a229ff' },
      { colorName: '', colorHexValue: '#9e1fff' },
      { colorName: '', colorHexValue: '#9914ff' },
      { colorName: '', colorHexValue: '#970fff' },
      { colorName: '', colorHexValue: '#9305ff' },
    ];
    // The generic list of Dark Purple colors based on gradient.
    this.DpurpleGradient = [
      { colorName: '', colorHexValue: '#8b00f5' },
      { colorName: '', colorHexValue: '#8800f0' },
      { colorName: '', colorHexValue: '#8200e6' },
      { colorName: '', colorHexValue: '#7f00e0' },
      { colorName: '', colorHexValue: '#7c00db' },
      { colorName: '', colorHexValue: '#7600d1' },
      { colorName: '', colorHexValue: '#7400cc' },
      { colorName: '', colorHexValue: '#7100c7' },
      { colorName: '', colorHexValue: '#6b00bd' },
      { colorName: '', colorHexValue: '#6800b8' },
      { colorName: '', colorHexValue: '#6500b3' },
      { colorName: '', colorHexValue: '#5f00a8' },
      { colorName: '', colorHexValue: '#5c00a3' },
      { colorName: '', colorHexValue: '#5a009e' },
      { colorName: '', colorHexValue: '#540094' },
    ];
    // The generic list of Light Orange colors based on gradient.
    this.LorangeGradient = [
      { colorName: '', colorHexValue: '#ffd17a' },
      { colorName: '', colorHexValue: '#ffcf75' },
      { colorName: '', colorHexValue: '#ffcb6b' },
      { colorName: '', colorHexValue: '#ffc861' },
      { colorName: '', colorHexValue: '#ffc65c' },
      { colorName: '', colorHexValue: '#ffc252' },
      { colorName: '', colorHexValue: '#ffbf47' },
      { colorName: '', colorHexValue: '#ffbd42' },
      { colorName: '', colorHexValue: '#ffb938' },
      { colorName: '', colorHexValue: '#ffb62e' },
      { colorName: '', colorHexValue: '#ffb429' },
      { colorName: '', colorHexValue: '#ffb01f' },
      { colorName: '', colorHexValue: '#ffad14' },
      { colorName: '', colorHexValue: '#ffab0f' },
      { colorName: '', colorHexValue: '#ffa805' },
    ];
    // The generic list of Dark Orange colors based on gradient.
    this.DorangeGradient = [
      { colorName: '', colorHexValue: '#f59f00' },
      { colorName: '', colorHexValue: '#f09c00' },
      { colorName: '', colorHexValue: '#e69500' },
      { colorName: '', colorHexValue: '#e09200' },
      { colorName: '', colorHexValue: '#db8f00' },
      { colorName: '', colorHexValue: '#d18800' },
      { colorName: '', colorHexValue: '#cc8500' },
      { colorName: '', colorHexValue: '#c78100' },
      { colorName: '', colorHexValue: '#bd7b00' },
      { colorName: '', colorHexValue: '#b87700' },
      { colorName: '', colorHexValue: '#b37400' },
      { colorName: '', colorHexValue: '#a86d00' },
      { colorName: '', colorHexValue: '#a36a00' },
      { colorName: '', colorHexValue: '#9e6700' },
      { colorName: '', colorHexValue: '#946000' },
    ];

    this.activeColors = this.colors;
  }

  // Returns the specified hex value of the color from the current colors list based on index.
  getColorAtIndex(index: number): string
  {
    if (this.activeColors && index < this.activeColors.length) {
      const c = this.activeColors[index].colorHexValue;
      return c;
    }
    else {
      return '#006600';
    }
  }

  // Changes the active Color array that the color selection will pull from.
  changeColorScheme(colorArray: number): void {
    switch (colorArray){
      case (0):
        this.activeColors = this.colors;
        break;
      case (1):
        this.activeColors = this.LblueGradient;
        break;
      case (2):
        this.activeColors = this.DblueGradient;
        break;
      case (3):
        this.activeColors = this.LgreenGradient;
        break;
      case (4):
        this.activeColors = this.DgreenGradient;
        break;
      case (5):
        this.activeColors = this.LpurpleGradient;
        break;
      case (6):
        this.activeColors = this.DpurpleGradient;
        break;
      case (7):
        this.activeColors = this.LredGradient;
        break;
      case (8):
        this.activeColors = this.DredGradient;
        break;
      case (9):
        this.activeColors = this.LorangeGradient;
        break;
      case (10):
        this.activeColors = this.DorangeGradient;
        break;
      default:
        this.activeColors = this.colors;
        break;
    }
  }
}
