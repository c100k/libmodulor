set -e

buildDir=dist-examples/examples
productPath=products/Playground

################################
# Product > Playground
################################

# react-web-pure
targetName=react-web-pure
echo "Testing e2e $targetName"
URL=localhost:7443 pnpm playwright test -c examples/${productPath}/targets/${targetName}
