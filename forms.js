function l() {

  var styleOutlineGreen    = 'outline: 2px solid  green;  padding:2px;';
  var styleOutlineRed      = 'outline: 2px dotted red;    padding:2px;';
  var styleOutlineYellow   = 'outline: 2px solid  yellow; padding:2px;';
  var styleLabel           = 'padding:1px; color:black; font-weight:bold; font-family:sans-serif; font-size:small; background-color:yellow; z-index:2147483647; speak:literal-punctuation;';

  var spanLabel = function(type, label) {
    return '<span class="'+type+'Span" style="'+styleLabel+'">'+label+'</span>';
  };

  $("span").remove(".openSpan, .closeSpan, .inputSpan");
  $("fieldset").attr('style', styleOutlineGreen);
  $("label").attr('style', styleOutlineGreen);

  var inputs = $('input, textarea, select').not(':input[type=hidden], :input[type=button], :input[type=submit], :input[type=reset]');
  $(inputs).each(function() {
    $(this).attr('style', styleOutlineGreen);
    var label = $('label[for="'+$(this).attr('id')+'"]');
    var wrappedLabel;

    if(label.length <= 0) {
      $(this).attr('style', styleOutlineRed);
      var parentElem = $(this).parent(),
      parentTagName = parentElem.get(0).tagName.toLowerCase();

      if(parentTagName == "label") {
        $(this).attr('style',styleOutlineGreen);
        wrappedLabel = parentElem;
      }

    }

    if(!$(this).attr('id')) {
      $(this).before(spanLabel('input', '&lt;input NO ID&gt;'));
      $(this).attr('style',styleOutlineRed);
    } else {
      $(this).before(spanLabel('input', '&lt;input 🆔="'+$(this).attr('id')+'"&gt;'));
    }

    $(label).prepend(spanLabel('open', '&lt;input 🍀="'+$(this).attr('id')+'"&gt;'));
    $(label).append(spanLabel('close', '&lt;/input&gt;'));
    $(wrappedLabel).prepend(spanLabel('open', '&lt;input 🎁&gt;'));
    $(wrappedLabel).append(spanLabel('close', '&lt;/input&gt;'));
    $(wrappedLabel).attr('style',styleOutlineGreen);

    if($(this).attr('title')) {
      $(this).after("<span class=\"closeSpan\" style=\"color:black;font-weight:bold;font-family:sans-serif;font-size:small;background-color:yellow;outline:dashed 2px orange;speak:literal-punctuation;\">♿title=\""+$(this).attr('title')+"\"</span>");
    }
    if($(this).attr('aria-label')) {
      $(this).after("<span class=\"closeSpan\" style=\"color:black;font-weight:bold;font-family:sans-serif;font-size:small;background-color:yellow;margin:0 2px; padding:2px;speak:literal-punctuation;\">♿aria-label=\""+$(this).attr('aria-label')+"\"</span>");
    }
    if($(this).attr('aria-describedby')) {
      $(this).after("<span class=\"closeSpan\" style=\"color:black;font-weight:bold;font-family:sans-serif;font-size:small;background-color:yellow;margin:0 2px; padding:2px;speak:literal-punctuation;\">♿aria-describedby=\""+$(this).attr('aria-describedby')+"\"</span>");
      var describedbyValue = $(this).attr('aria-describedby');
      var describedbyArray = describedbyValue.split(' ');

      for (i = 0; i < describedbyArray.length; i++) {
        var describedby = $('[id="'+describedbyArray[i]+'"]');
        $(describedby).attr('style','outline:green 2px solid;');
        $(describedby).prepend("<span class=\"inputSpan\" style=\"padding:1px;color:black;font-weight:bold;font-family:sans-serif;font-size:small;background-color:yellow;z-index:2147483647;speak:literal-punctuation;\">🆔=\""+describedbyArray[i]+"\"</span>");
      }

    }

    if($(this).attr('aria-labelledby')) {
      $(this).after("<span class=\"closeSpan\" style=\"color:black;font-weight:bold;font-family:sans-serif;font-size:small;background-color:yellow;margin:0 2px; padding:2px;speak:literal-punctuation;\">♿aria-labelledby=\""+$(this).attr('aria-labelledby')+"\"</span>");
      var labelledbyValue = $(this).attr('aria-labelledby');
      var labelledbyArray = labelledbyValue.split(' ');

      for (i = 0; i < labelledbyArray.length; i++) {
        $('[id="'+labelledbyArray[i]+'"]').attr('style','outline:green 2px solid;');
        $('[id="'+labelledbyArray[i]+'"]').prepend("<span class=\"inputSpan\" style=\"padding:1px;color:black;font-weight:bold;font-family:sans-serif;font-size:small;background-color:yellow;z-index:2147483647;speak:literal-punctuation;\">🆔=\""+labelledbyArray[i]+"\"</span>");
      }

    }

    if($(this).attr('aria-required')) {
      $(this).after("<span class=\"closeSpan\" style=\"color:black;font-weight:bold;font-family:sans-serif;font-size:small;background-color:yellow;margin:0 2px; padding:2px;speak:literal-punctuation;\">&#9937;aria-required=\""+$(this).attr('aria-required')+"\"</span>");
    }

    if($(this).attr('aria-invalid')) {
      $(this).after("<span class=\"closeSpan\" style=\"color:black;font-weight:bold;font-family:sans-serif;font-size:small;background-color:yellow;margin:0 2px; padding:2px;speak:literal-punctuation;\">&#9940;aria-invalid=\""+$(this).attr('aria-invalid')+"\"</span>");
    }
  });

  $('label').each(function(index) {
    var forAttr = $(this).attr('for');
    var idString = "#";
    idString += forAttr;

    if ($(idString).length <=0 && $(this).attr('for')) {
      $(this).attr('style','outline:red 2px dotted;padding:2px;');
      $(this).prepend("<span class=\"openSpan\" style=\"color:black;font-weight:bold;font-family:sans-serif;font-size:small;background-color:yellow;speak:literal-punctuation;\">&lt;label❌NO ID MATCH&gt;</span>");
      $(this).append("<span class=\"closeSpan\" style=\"color:black;font-weight:bold;font-family:sans-serif;font-size:small;background-color:yellow;speak:literal-punctuation;\">&lt;/label&gt;</span>");
    }

  });
  $('[aria-describedby]').each(function(index) {
    var describedbyValue = $(this).attr('aria-describedby');
    var describedbyArray = describedbyValue.split(' ');

    for (i = 0; i < describedbyArray.length; i++) {
      var idString = "#";
      idString += describedbyArray[i];

      if ($(idString).length <=0 && $('[id="'+describedbyArray[i]+'"]')) {
        $(this).attr('style','outline:red 2px dotted;padding:2px;');
        $(this).after("<span class=\"closeSpan\" style=\"color:black;font-weight:bold;font-family:sans-serif;font-size:small;background-color:yellow;speak:literal-punctuation;\">❌NO ID MATCH</span>");
      }

    }
  });

  $('[aria-labelledby]').each(function(index) {
    var labelledbyValue = $(this).attr('aria-labelledby');
    var labelledbyArray = labelledbyValue.split(' ');

    for (i = 0; i < labelledbyArray.length; i++) {
      var idString = "#";
      idString += labelledbyArray[i];

      if ($(idString).length <=0 && $('[id="'+labelledbyArray[i]+'"]')) {
        $(this).attr('style','outline:red 2px dotted;padding:2px;');
        $(this).after("<span class=\"closeSpan\" style=\"color:black;font-weight:bold;font-family:sans-serif;font-size:small;background-color:yellow;speak:literal-punctuation;\">❌NO ID MATCH</span>");
      }

    }
  });

  $("legend").each(function() {
    $(this).attr('style','outline:green 2px solid;padding:2px;display:block !important;');
    $(this).prepend("<span class=\"openSpan\" style=\"padding:1px;color:black;font-weight:bold;font-family:sans-serif;font-size:small;background-color:yellow;z-index:2147483647;speak:literal-punctuation;\">&lt;legend&gt;👍</span>");
    $(this).append("<span class=\"closeSpan\" style=\"color:black;font-weight:bold;font-family:sans-serif;font-size:small;background-color:yellow;speak:literal-punctuation;\">&lt;/legend&gt;</span>");
  });

  $("fieldset").each(function() {
    $(this).before("<span class=\"openSpan\" style=\"padding:1px;color:black;font-weight:bold;font-family:sans-serif;font-size:small;background-color:yellow;z-index:2147483647;speak:literal-punctuation;\">&lt;fieldset&gt;</span>");
    $(this).after("<span class=\"closeSpan\" style=\"color:black;font-weight:bold;font-family:sans-serif;font-size:small;background-color:yellow;speak:literal-punctuation;\">&lt;/fieldset&gt;</span>");
  });

  if (!$(inputs).length) {
    alert("No Form Inputs Found on Page: " + document.title);
  } else {
    $('body').append('<div id="success" role="alert" style="position:absolute; width:0; height:0; clip: rect(0,0,0,0);"></div>');
    $('#success').html('Success! Form Inputs Found!');
    setTimeout(function(){ $('#success').remove(); }, 3000);
  }

  $("script[src$='forms.js']").remove();s.remove();

}

l()
