function search(options) {
  var $input = $(".search-input"),
      $results = $(".search-results"),
      loaded = false,
      searching = false,
      selecting = false,
      searchDocs = null,
      lastSearchTerm = "",
      index = null;

  function getSnippetIndex(start, content, direction) {
    var result = start;
    var lastSpace = start;
    while (true) {
      result += direction;
      if (result == 0 || result + 1 == content.length) {
        return result;
      }
      if (content[result] == ' ') {
        lastSpace = result;
      }
      if (content[result] == '.') {
        if (direction < 0) {
          result -= direction; 
        }
        return result
      }
      if (Math.abs(start - result) > 100) {
        return lastSpace;
      }
    }
  }

  function getSnippet(searchTerm, content) {
    var termStart = content.toLowerCase().indexOf(searchTerm.toLowerCase());
    if (termStart < 0) {
      return "";
    }
    var termEnd = termStart + searchTerm.length;
    var snippetStart = getSnippetIndex(termStart, content, -1);
    var snippetEnd = getSnippetIndex(termEnd, content, 1);

    return $("<span>").append(
      "..." + content.substring(snippetStart, termStart),
      $("<span>").addClass("search search-highlight")
                 .append(content.substring(termStart, termEnd)),
      content.substring(termEnd, snippetEnd) + "..."          
    );
  }

  function getResult(searchTerm, doc) {
    return $("<div>")
      .addClass("search search-result")
      .append(
        $("<div>")
          .addClass("search search-result-title")
          .append($("<a>")
            .attr("href", doc.href)
            .click(exitSearch)
            .append(doc.title)),
        $("<div>")
          .addClass("search search-result-path")
          .append($("<a>")
            .attr("href", doc.href)
            .click(exitSearch)
            .append(doc.collection + " · " + doc.subcategory)),
        $("<div>")
          .addClass("search search-result-content")
          .append(getSnippet(searchTerm, doc.content))
      );
  }

  function exitSearchSelect() {
    if (loaded) {
      selecting = false;
      $results.hide();
      $results.empty();
    }
  }

  function exitSearch() {
    if (loaded) {
      searching = false;
      $input.removeClass("search-input-extended");
      $input.val("");
      exitSearchSelect()
    }
  }

  function enterSearchSelect() {
    if (loaded) {
      selecting = true;
      $input.focus();
      $results.show();
    }
  }

  function enterSearch() {
    if (loaded) {
      $input.addClass("search-input-extended");
    } else {
      exitSearch();
    }
  }
  
  function query(searchTerm) {
    if (searchTerm == lastSearchTerm) {
      return;
    }

    $input.val(searchTerm);
    exitSearchSelect();

    if (searchTerm.length > 1) {
      var matches = index.search(searchTerm + '*');
  
      if (matches.length > 1) {
        matches.forEach(function(match) {
          var doc = searchDocs[match.ref];
          var result = getResult(searchTerm, doc);
          $results.append(result)
        })

        enterSearchSelect();
        lastSearchTerm = searchTerm;
      }
    }
  }

  $.get(options.searchDataPath, function(data) {
    searchDocs = data;
    index = lunr(function () {
      this.ref('id');
      this.field('collection', { boost: 10 });
      this.field('subcategory', { boost: 50 });
      this.field('title', { boost: 100 });
      this.field('content');

      this.pipeline._stack = [];
      
      data.forEach(function (doc, id) {
        doc.id = id;
        doc.content = doc.content.replace(doc.title, "");
        this.add(doc)
      }, this)
      loaded = true;
    })
  });

  $input.mouseenter(enterSearch);
  $input.mouseleave(function() { 
    if (!searching && !selecting) {
      exitSearch();
    }
  });
  $input.focusin(function() { 
    searching = true;
    enterSearch();
  });
  $input.focusout(function() {
    if (!selecting) {
      exitSearch();
    }
  });
  $input.on("change paste keyup", function () {
    query($input.val());
  });

  $results.mouseenter(function() {
    selecting = true;
  });
  $results.mouseleave(function() {
    selecting = false;
  });
}