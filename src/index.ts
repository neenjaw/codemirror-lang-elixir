import { parser } from './syntax.grammar'
import {
  LezerLanguage,
  LanguageSupport,
  indentNodeProp,
  foldNodeProp,
  foldInside,
  delimitedIndent,
} from '@codemirror/language'
import { styleTags, tags as t } from '@codemirror/highlight'

export const ElixirLanguage = LezerLanguage.define({
  parser: parser.configure({
    props: [
      indentNodeProp.add({
        Application: delimitedIndent({ closing: ')', align: false }),
      }),
      foldNodeProp.add({
        Application: foldInside,
      }),
      styleTags({
        Identifier: t.variableName,
        BooleanLiteral: t.bool,
        StringLiteral: t.string,
        CharlistLiteral: t.string,
        HeredocsLiteral: t.string,
        LineComment: t.lineComment,
        '( )': t.paren,
        '[ ]': t.squareBracket,
        '{ }': t.brace,
        '<< >>': t.angleBracket,
      }),
    ],
  }),
  languageData: {
    commentTokens: { line: ';' },
  },
})

export function Elixir() {
  return new LanguageSupport(ElixirLanguage)
}
