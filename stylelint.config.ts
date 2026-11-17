export default {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-idiomatic-order',
  ],
  overrides: [
    {
      // Lets the rules above run on the <style> block of a single file component.
      files: ['**/*.vue'],
      customSyntax: 'postcss-html',
    },
  ],
  rules: {
    // Component and utility class names are not BEM-only in this template.
    'selector-class-pattern': null,
  },
}
