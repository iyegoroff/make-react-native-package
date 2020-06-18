require 'json'

package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

Pod::Spec.new do |s|
  s.name             = package['name']
  s.version          = package['version']
  s.summary          = package['description']
  s.homepage         = package['homepage']
  s.license          = package['license']
  s.author           = package['author']
  s.platform         = :ios, '{{iosVersion}}'
  s.source           = { :git => 'https://github.com/{{githubUsername}}/{{packageName}}.git', :tag => 'v#{s.version}' }
  s.source_files     = 'ios/**/*.{h,m,mm,swift}'
  s.requires_arc     = true
  s.swift_version    = '5.0'

  s.dependency 'React'

  {{#if jetpackComposeAndSwiftUiEnabled}}
  s.script_phase = {
    :name => 'Create {{camelCase packageName}}.h',
    :script => 'touch "${PODS_ROOT}/Headers/Public/{{camelCase packageName}}/{{camelCase packageName}}.h"',
    :execution_position => :before_compile
  }
  {{/if}}
end

