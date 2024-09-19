<template>
  <v-container>
    <v-row justify="center" class="mt-12">
      <v-col cols="12" md="6" class="text-center">
        <h1>Acesso Negado</h1>
        <p>Você não tem permissão para acessar esta página.</p>
        <v-btn color="primary" @click="$router.push('/')">Voltar para Home</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
