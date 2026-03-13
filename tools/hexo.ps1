$ErrorActionPreference = 'Stop'

param(
  [Parameter(ValueFromRemainingArguments = $true)]
  [string[]] $Args
)

& node "$PSScriptRoot\..\node_modules\hexo\bin\hexo" @Args
