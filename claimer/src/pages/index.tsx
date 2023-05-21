import { Container } from "@/components/Container";
import { Title } from "@/components/Title";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";

export default function Home() {
  const router = useRouter();

  return (
    <Container>
      <Title>Claim your mystery box</Title>
      <section>
          <li onClick={() => router.push("/off-chain/two-auths-claim-and-signature")}>
            <h3>One Claim, two Auths and Signature</h3>
            <p>- Claim on a groupId with devMode true</p>
            <p>- Required GitHub account ownership</p>
            <p>- Optional Twitter account ownership</p>
            <p>- Message signature</p>
          </li>
        </ul>
      </section>
    </Container>
  );
}
