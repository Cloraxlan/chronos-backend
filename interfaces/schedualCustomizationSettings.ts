export default interface schedualCustomizationSettings {
  baseName: string;
  singleSchedualSettings: singleSchedualSetting[];
}
export interface singleSchedualSetting {
  name: string;
  customizations: string[];
}
