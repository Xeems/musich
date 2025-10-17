module.exports = {
    extends: ['prettier', 'plugin:prettier/recommended'],

    ignorePatterns: ['.config/*'],
    env: {
        browser: true,
        es2021: true,
    },
    overrides: [
        {
            files: ['*.js', '*.jsx', '*.ts', '*.tsx'],

            parserOptions: {
                project: './tsconfig.json',
                ecmaFeatures: {
                    jsx: true,
                },
                ecmaVersion: 'latest',
                sourceType: 'module',
            },
            plugins: ['react-hooks', '@ts-safeql/eslint-plugin'],
            rules: {
                'react-hooks/exhaustive-deps': 'off',
                'simple-import-sort/imports': [
                    'error',
                    {
                        groups: [
                            // Packages `react` related packages come first.
                            ['^react', '^@?\\w'],
                            // Internal packages.
                            ['^(@|components)(/.*|$)'],
                            // Side effect imports.
                            ['^\\u0000'],
                            // Parent imports. Put `..` last.
                            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
                            // Other relative imports. Put same-folder imports and `.` last.
                            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
                            // Style imports.
                            ['^.+\\.?(css)$'],
                        ],
                    },
                ],
            },
        },
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'react', 'simple-import-sort'],
    rules: {
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
        'consistent-return': 1,
        'jsx-a11y/label-has-associated-control': 0,
        'react-hooks/exhaustive-deps': 0,
        '@typescript-eslint/no-misused-promises': 0,
        'react/require-default-props': 0,
        '@typescript-eslint/no-floating-promises': 0,
        'import/export': 0,
        'react/no-array-index-key': 0,
        'react/prop-types': 0,
        'import/no-extraneous-dependencies': 0,
        'react/jsx-props-no-spreading': 0,
        'react/react-in-jsx-scope': 0,
        'import/prefer-default-export': 0,
        'import/extensions': 0,
    },
}

