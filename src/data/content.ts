// Only add records whose facts and public links have been reviewed.
export type ResearchStatus = 'Published' | 'Preprint' | 'Submitted' | 'Ongoing' | 'Completed';
export interface Research {
  slug: string; title: string; summary: string; status: ResearchStatus;
  kind: 'Publication' | 'Study' | 'Poster' | 'Presentation';
  authors?: string[]; year?: number; journal?: string; doi?: string;
  url?: string; download?: string; body: string[];
}
export interface Application {
  slug: string; title: string; summary: string;
  status: 'Prototype — release unverified' | 'In development' | 'Released' | 'Archived';
  technology: string[]; mark?: string; visualLabel?: string; source?: string; live?: string; documentation?: string;
  screenshot?: { src: string; alt: string; width: number; height: number };
  body: string[]; limitations: string;
}
export interface Resource {
  slug: string; title: string; summary: string; topic: string;
  kind: 'Slides' | 'Guide' | 'Worksheet' | 'Reading';
  download?: string; url?: string; body: string[];
}
export const research: Research[] = [];
export const resources: Resource[] = [];
export const applications: Application[] = [{
  slug: 'psy-adr', title: 'CDSCO ADR Smart Builder',
  summary: 'A browser-based interface for collecting psychotropic adverse drug reaction information and preparing a structured report.',
  mark: 'ADR', visualLabel: 'Data → Structure → Report',
  status: 'Prototype — release unverified', technology: ['HTML', 'CSS', 'JavaScript'],
  source: 'https://github.com/mahanteshmentos-mantu/PSY-ADR-app',
  body: [
    'The public PSY-ADR-app repository contains a single-file web interface titled CDSCO ADR Smart Builder. Its source includes structured data entry, local saving, a summary view, and a print layout.',
    'The interface also contains WHO-UMC and Naranjo summary elements. Their implementation has not been clinically validated as part of this website project.',
    'The source code is available for inspection. No verified production release or live service is listed here.'
  ],
  limitations: 'Prototype for review. Clinical accuracy, security, regulatory compliance, and suitability for patient data have not been established. The project name does not imply CDSCO endorsement. Do not use it to make clinical decisions or enter identifiable patient information.'
}];
