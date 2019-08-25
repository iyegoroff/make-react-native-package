{{#each modules}}
export { {{pascalCase this}} } from './{{pascalCase this}}'
{{/each}}
{{#each components}}
export { {{pascalCase this}} } from './{{pascalCase this}}'
{{/each}}
