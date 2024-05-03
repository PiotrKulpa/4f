/* eslint-disable */
/**
 * Custom interceptors for the project.
 *
 * This project has a section in its package.json:
 *    "pwa-studio": {
 *        "targets": {
 *            "intercept": "./local-intercept.js"
 *        }
 *    }
 *
 * This instructs Buildpack to invoke this file during the intercept phase,
 * as the very last intercept to run.
 *
 * A project can intercept targets from any of its dependencies. In a project
 * with many customizations, this function would tap those targets and add
 * or modify functionality from its dependencies.
 */

module.exports = (targets) => {
  const peregrineTargets = targets.of("@magento/peregrine");
  const talonsTarget = peregrineTargets.talons;

  talonsTarget.tap((talonWrapperConfig) => {
    talonWrapperConfig.ProductFullDetail.useProductFullDetail.wrapWith(
      "my-extension"
    );
  });

  const builtins = targets.of("@magento/pwa-buildpack");
  builtins.specialFeatures.tap((featuresByModule) => {
    featuresByModule["@my-extension/my-product-page"] = {
      // Wrapper modules must be ES Modules
      esModules: true,
    };
  });
};

// NIESTETY NIE UDAŁO MI SIĘ ROZSZERZYĆ TALONA, 
// DODAŁEM HOOKA do FOLDERU HOOKS oraz ZMODYFIKOWANE ZAPYTANIE DO FOLDERU QUERIES, WYDAJE SIĘ ŻE TEN WALKAROUND DZIAŁA
