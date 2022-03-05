@php
$config = [
'appName' => config('app.name'),
'locale' => $locale = app()->getLocale(),
'locales' => config('app.locales'),
];
$appJs = mix('dist/js/app.js');
$appCss = mix('dist/js/app.css');
$style = mix('dist/css/vue-styles.css');
@endphp
<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">

<head>
  <meta charset="utf-8">

  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>{{ config('app.name') }}</title>

  <link rel="stylesheet" href="{{ mix('/css/app.css') }}">

</head>

<body>
  <div id="app"></div>
  <script>
    window.config = @json($config);
  </script>
  {{-- <script src="{{ (str_starts_with($appJs, '//') ? 'http:' : '').$appJs }}"></script> --}}
  <script src="{{ mix('/js/app.js')  }}"></script>
</body>

</html>
