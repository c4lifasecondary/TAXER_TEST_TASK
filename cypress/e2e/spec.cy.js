const ASN1 = require('@lapo/asn1js')

describe('TAXER regression suite', () => {
  let text

  beforeEach(() => {
    cy.visit('https://js-55fbfg.stackblitz.io/')
    cy.intercept('https://l.staticblitz.com/**').as('scripts')
    cy.wait('@scripts')
  })
  
  it.each([
    ['cypress/fixtures/cert.cer', 3],
    ['cypress/fixtures/cert2.cer', 2],
    ['cypress/fixtures/czo_2017.cer', 2],
    ['cypress/fixtures/ekpp_sign_2014.cer', 2],
    ['cypress/fixtures/idd_2019.cer', 2],
    ['cypress/fixtures/privat_2018.cer', 2],
    ['cypress/fixtures/nesterenko.cer', 1],
    ['cypress/fixtures/sukharenko.cer', 1],
    ['cypress/fixtures/taxer test.cer', 2],
    ['cypress/fixtures/Tellipse 1111.cer', 3],
    ['cypress/fixtures/test platnyk.cer', 0]
  ])(`Check certificates data on drag'n'drop`, (item, index) => {
    cy.get('button').click()
    cy.get('.btn-primary').click()

    cy.readFile(item, null).then(fileContent => {
      cy.get('.dropbox').attachFile({
        fileContent,
        filePath: item,
        encoding: null,
        lastModified: new Date().getTime(),
      },
      { 
        subjectType: 'drag-n-drop', 
        force: true
      })

    const result = ASN1.decode(fileContent);
    if (result.typeName() !== 'SEQUENCE') {
      throw new Error('Неправильна структура конверта сертифіката (очікується SEQUENCE)')
    }
    const tbsCertificate = result.sub[0]

    let expectedResult = {}
    let actualResult = {}

    text = cy.get('.list-group a').then((x) => {
      text = x.text().split('\n')[1].trim()
    })

    cy.get('table tbody').table().then((x) => {

      actualResult.subjectCN = x[0][1]
      actualResult.issuerCN = x[1][1]
      actualResult.validFrom = x[2][1]
      actualResult.validTill = x[3][1]
      actualResult.listGroupName = text

      expectedResult.subjectCN = tbsCertificate.sub[5].sub[index].sub[0].sub[1].content(),
      expectedResult.issuerCN = tbsCertificate.sub[3].sub[2].sub[0].sub[1].content(),
      expectedResult.validFrom = tbsCertificate.sub[4].sub[0].content(),
      expectedResult.validTill = tbsCertificate.sub[4].sub[1].content(),
      expectedResult.listGroupName = expectedResult.subjectCN

      expect(actualResult).to.deep.equal(expectedResult)
    })
})
})

afterEach(() => {
  cy.clearAllSessionStorage()
})
})