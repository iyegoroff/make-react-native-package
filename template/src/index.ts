{{#each modules}}
export * from './{{pascalCase this}}'
{{/each}}
{{#each components}}
export * from './{{pascalCase this}}'
{{/each}}
