import {parser} from "./syntax.grammar"
import {LRLanguage, LanguageSupport, indentNodeProp, foldNodeProp, foldInside, delimitedIndent} from "@codemirror/language"
import {styleTags, tags as t} from "@codemirror/highlight"

export const DFSLanguage = LRLanguage.define({
  parser: parser.configure({
    props: [
      indentNodeProp.add({
        Application: delimitedIndent({closing: ")", align: false})
      }),
      foldNodeProp.add({
        Application: foldInside
      }),
      styleTags({
        Identifier: t.variableName,
        Boolean: t.bool,
        Float: t.float,
        Int: t.integer,
        Operator: t.operator,
        String: t.string,
        Reference: t.strong,
        LineComment: t.lineComment,
        DEF: t.keyword,
        Node: t.keyword,
        Macro: t.keyword,
        UserNode: t.keyword,
        Lambda: t.keyword,
        Expr: t.keyword,
        Dot: t.punctuation,
        "( )": t.paren
      })
    ]
  }),
  languageData: {
    commentTokens: {line: "%"}
  }
})

export function DFS() {
  return new LanguageSupport(DFSLanguage)
}
