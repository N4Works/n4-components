; (function() {

  "use strict";

  class MenuSuspensoDirective implements ng.IDirective {
    link(scope: ng.IScope, element: ng.IAugmentedJQuery, atributos: ng.IAttributes) {
      let {seletorMenuSuspenso = ".menu.suspenso", seletorBotao = ".botao-menu", classeAberto = "aberto", seletorRadio = "input[type=\"radio\"]", seletorIcone = ".icone"} = atributos;
      element.on("click", seletorBotao, event => {
        let $botao = $(event.currentTarget);
        if ($botao.hasClass(classeAberto)) {
          $botao.removeClass(classeAberto);
          event.stopPropagation();
          return false;
        }
        element.find(seletorBotao).removeClass(classeAberto);
        $botao.addClass(classeAberto);
        event.stopPropagation();
        return false;
      });
      element.on("change", seletorRadio, event => {
        let $radio: ng.IAugmentedJQuery = <any>$(event.currentTarget);
        let $menu: ng.IAugmentedJQuery = <any>$radio.closest(seletorMenuSuspenso);
        let $icone: ng.IAugmentedJQuery = $menu.find(seletorBotao).find(seletorIcone);
        $icone.removeClass((index, css) => {
          let matches = /icone-\S+/gi.exec(css);
          return !!matches ? matches.join(" ") : "";
        });
        let classe = $radio.attr("icone");
        $icone.addClass(classe);
      });
      let $body = $("body");
      $body.on("click", event => {
        element.find(seletorBotao).removeClass(classeAberto);
      });

      scope.$on("$destroy", () => {
        element.off("click");
        element.off("change");
        $body.off("click");
      });
    }
  }

  angular.module("unne.landingPage")
    .directive("menuSuspenso", [
    () => {
      return new MenuSuspensoDirective();
    }
  ]);

} ());
