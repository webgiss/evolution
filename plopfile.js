export default function (plop) {
    plop.setGenerator('component', {
        description: 'Créer un composant React',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'Nom du composant ?',
            },
            {
                type: 'input',
                name: 'sliceName',
                message: 'Nom du slice ?',
            },
        ],
        actions: [
            {
                type: 'add',
                path: 'src/client/components/{{pascalCase name}}/index.jsx',
                templateFile: 'plop-templates/component.hbs',
            },
            {
                type: 'add',
                path: 'src/client/components/{{pascalCase name}}/index.stories.jsx',
                templateFile: 'plop-templates/component-stories.hbs',
            },
            {
                type: 'add',
                path: 'src/client/components/{{pascalCase name}}/{{pascalCase name}}.css',
                templateFile: 'plop-templates/component-style.hbs',
            },
        ],
    });
    plop.setGenerator('slice', {
        description: 'Créer un slice Redux',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'Nom du slice ?',
            },
        ],
        actions: [
            {
                type: 'add',
                path: 'src/client/redux/slices/slice/{{camelCase name}}.js',
                templateFile: 'plop-templates/slice.hbs',
            },
            {
                type: 'add',
                path: 'src/client/redux/selectors/{{camelCase name}}.js',
                templateFile: 'plop-templates/slice-selectors.hbs',
            },
            {
                type: 'modify',
                path: 'src/client/redux/slices/index.js',
                pattern: /(\/\/ plop-import-slice)/g,
                template: `import {{camelCase name}} from './slice/{{camelCase name}}';\n$1`
            },
            {
                type: 'modify',
                path: 'src/client/redux/slices/index.js',
                pattern: /(\/\/ plop-insert-slice)/g,
                template: `{{camelCase name}},\n    $1`
            },

        ]
    })
};